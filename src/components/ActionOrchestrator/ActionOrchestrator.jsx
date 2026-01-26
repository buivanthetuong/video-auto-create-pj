// src/Components/ActionOrchestrator/ActionOrchestrator.jsx
import React from "react";
import { useCurrentFrame } from "remotion";
import { calculateCssOverrides } from "./utils/cssOverrideManager";
import { ACTION_REGISTRY } from "./utils/actionRegistry";

/**
 * 🎯 ACTION ORCHESTRATOR - File trung gian điều hành các actions
 *
 * Chức năng:
 * - Quản lý timeline và frame calculations
 * - Tìm các actions đang active
 * - Tính toán CSS overrides tích lũy
 * - Render actions thông qua registry
 * ⭐ Hỗ trợ delay actions
 * ⭐ Hỗ trợ parent-child hierarchy với 3 style levels
 */
function ActionOrchestrator({ codeFrame = [], textEnd }) {
  const frame = useCurrentFrame();

  // ✅ Tính toán toEndFrame
  const toEndFrame = React.useMemo(() => {
    if (codeFrame.length === 0) return 0;
    return Math.max(...codeFrame.map((item) => item.endFrame));
  }, [codeFrame]);
  // ⭐ Tính toán group endFrames (endFrame lớn nhất của mỗi group)
  const groupEndFrames = React.useMemo(() => {
    const groupMap = new Map();

    codeFrame.forEach((item) => {
      const actions = Array.isArray(item.actions)
        ? item.actions
        : item.action
          ? [item.action]
          : [];

      actions.forEach((action) => {
        if (!action || !action.cmd) return;

        // Chỉ xét các action có group (không phải undefined, null)
        const group = action.group;
        if (group === undefined || group === null) return;

        // Lấy endFrame hiện tại của group (nếu đã có)
        const currentGroupEndFrame = groupMap.get(group) || 0;

        // So sánh và lưu endFrame lớn nhất
        if (item.endFrame > currentGroupEndFrame) {
          groupMap.set(group, item.endFrame);
        }
      });
    });

    return groupMap;
  }, [codeFrame]);

  // ✅ Tìm currentItem (fallback logic)
  const currentItem = React.useMemo(() => {
    return codeFrame.find(
      (item) => frame >= item.startFrame && frame < item.endFrame,
    );
  }, [codeFrame, frame]);

  // ✅ Tìm TẤT CẢ actions đang active (với delay support)
  const activeActions = React.useMemo(() => {
    const allActiveActions = [];

    codeFrame.forEach((item, itemIndex) => {
      const actions = Array.isArray(item.actions)
        ? item.actions
        : item.action
          ? [item.action]
          : [];

      actions.forEach((action, actionIndex) => {
        if (!action || !action.cmd) return;

        // ⭐ Tính toán frame range với DELAY support
        let actionStartFrame = item.startFrame;
        let actionEndFrame = item.endFrame;

        // ⭐ 1. Apply delay trước (nếu có)
        if (typeof action.delay === "number") {
          actionStartFrame = item.startFrame + action.delay;
        }

        // ⭐ 2. Xử lý ToEndFrame và ChangeStartFrame/ChangeEndFrame
        if (action.ToEndFrame === true) {
          actionEndFrame = toEndFrame;
          if (typeof action.ChangeStartFrame === "number") {
            actionStartFrame = actionStartFrame + action.ChangeStartFrame;
          }
        } else if (action.group !== undefined && action.group !== null) {
          // ✅ Ưu tiên 2: Group
          const groupEndFrame = groupEndFrames.get(action.group);
          if (groupEndFrame !== undefined) {
            actionEndFrame = groupEndFrame;
          }

          // Vẫn cho phép ChangeStartFrame và ChangeEndFrame
          if (typeof action.ChangeStartFrame === "number") {
            actionStartFrame = actionStartFrame + action.ChangeStartFrame;
          }
          if (typeof action.ChangeEndFrame === "number") {
            actionEndFrame = actionEndFrame + action.ChangeEndFrame;
          }
        } else {
          if (typeof action.ChangeStartFrame === "number") {
            actionStartFrame = actionStartFrame + action.ChangeStartFrame;
          }
          if (typeof action.ChangeEndFrame === "number") {
            actionEndFrame = item.endFrame + action.ChangeEndFrame;
          }
        }

        // ⭐ 3. Check active (với frame range đã tính delay)
        if (frame >= actionStartFrame && frame <= actionEndFrame) {
          allActiveActions.push({
            action,
            item,
            itemIndex,
            actionIndex,
            actionStartFrame,
            actionEndFrame,
          });
        }
      });
    });

    return allActiveActions;
  }, [codeFrame, frame, toEndFrame]);

  // ✅ Tính toán CSS Overrides tích lũy
  const cssOverrides = React.useMemo(() => {
    return calculateCssOverrides(codeFrame, frame, toEndFrame);
  }, [codeFrame, frame, toEndFrame]);

  // ✅ Default styles
  const defaultTextStyle = {};

  // ✅ Function render action component
  const renderActionComponent = (activeActionData) => {
    const {
      action,
      item,
      itemIndex,
      actionIndex,
      actionStartFrame,
      actionEndFrame,
    } = activeActionData;

    // Lấy ActionComponent từ registry
    const ActionComponent = ACTION_REGISTRY[action.cmd];
    if (!ActionComponent) {
      return null;
    }

    // ✅ Chuẩn bị data object - SPREAD TOÀN BỘ item properties
    const actionData = {
      // ⭐ SPREAD TOÀN BỘ properties của item trước
      ...item,
      // Core data (có thể override item properties nếu trùng tên)
      action,
      item, // Giữ lại reference đầy đủ
      frame,
      // Frame timing
      actionStartFrame,
      actionEndFrame,
      toEndFrame,
      // Styling
      cssOverrides,
      defaultTextStyle,
      // Identifiers
      itemIndex,
      actionIndex,
      // ⭐ Class & ID - Ưu tiên action TRƯỚC, sau đó item
      className:
        action.className || action.class || item.ClassMark || item.className,
      id: action.id || item.IDMark || item.id,
    };

    return <ActionComponent data={actionData} />;
  };

  // ⭐ Function render action với parent-child wrapping
  const renderActionWithWrapper = (activeActionData, index) => {
    const { action } = activeActionData;

    // Lấy parentID và childID từ action
    const parentID = action.parentID || action.parentId;
    const childID = action.childID || action.childId;

    const parentClass = action.parentClass || "";
    const childClass = action.childClass || "";

    // Generate unique key
    const key = `${action.cmd}-${activeActionData.itemIndex}-${activeActionData.actionIndex}`;

    // ✅ Render component
    const component = renderActionComponent(activeActionData);

    // ⭐ CHỈ xét trường hợp có CẢ parentID và childID
    if (parentID && childID) {
      // Lấy 3 style riêng biệt
      const parentStyle = action.styleCssParent || {};
      const childStyle = action.styleCssChild || {};
      // styleCss sẽ được component tự xử lý thông qua action data

      return (
        <div
          key={key}
          id={parentID}
          className={parentClass}
          style={parentStyle}
        >
          <div id={childID} className={childClass} style={childStyle}></div>
          {component}
        </div>
      );
    }

    // ⭐ Không có cả 2 - render trực tiếp
    return <React.Fragment key={key}>{component}</React.Fragment>;
  };

  // ✅ Render content
  const renderContent = () => {
    if (activeActions.length > 0) {
      return (
        <>
          {activeActions.map((activeActionData, index) =>
            renderActionWithWrapper(activeActionData, index),
          )}
        </>
      );
    }

    if (currentItem) {
      const hasText = currentItem.text && currentItem.text.trim() !== "";
      if (hasText) {
        return <div style={currentItem.styleCss}>{currentItem.text}</div>;
      }
    }

    return <div style={{ position: "relative" }}>{textEnd}</div>;
  };

  return <>{renderContent()}</>;
}

export default ActionOrchestrator;
