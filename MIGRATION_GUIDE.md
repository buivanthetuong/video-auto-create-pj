# 🚀 QUICK START GUIDE - NEW ARCHITECTURE

## 📦 INSTALLATION

Không cần cài đặt thêm gì! Tất cả đã có sẵn trong project.

## 🎯 5-MINUTE TUTORIAL

### 1. Import những gì cần thiết

```javascript
// data.js
import { stylePresets } from "./components/ActionOrchestrator/presets/styles";
import { animationPresets } from "./components/ActionOrchestrator/presets/animations";
import { actionHints } from "./components/ActionOrchestrator/utils/actionHints";

// 💡 TIP: Log ra để xem có gì
console.log(actionHints.all()); // Xem tất cả actions
console.log(actionHints.typingText); // Xem hints cho typingText
```

### 2. Tạo action đầu tiên (Simple)

```javascript
const myFirstAction = {
  startFrame: 0,
  endFrame: 90,
  code: "SOUNDCHUNG_SpaceSound",
  timeFixed: 3,
  actions: [
    {
      cmd: "typingText",
      content: {
        text: "Hello World!",
        sound: true,
      },
      // ⭐ Không cần thêm gì - dùng defaults
    },
  ],
};
```

### 3. Thêm style preset

```javascript
{
  cmd: "typingText",
  content: {
    text: "BIG YELLOW TEXT!",
    sound: true
  },
  styleCss: {
    base: "typingText.bigYellow" // ⭐ Dùng preset có sẵn
  }
}
```

### 4. Override một chút

```javascript
{
  cmd: "typingText",
  content: {
    text: "Custom text",
    sound: true
  },
  styleCss: {
    base: "typingText.bigYellow",
    override: {
      fontSize: "120px", // ⭐ Chỉ override cái cần
      color: "#00FF00"
    }
  }
}
```

### 5. Thêm animation

```javascript
{
  cmd: "typingText",
  content: {
    text: "Animated text!",
    sound: true
  },
  styleCss: {
    base: "typingText.heroTitle"
  },
  animation: {
    type: "typingText.fadeIn", // ⭐ Preset animation
    params: {
      duration: 40 // ⭐ Override duration
    }
  }
}
```

## 🎨 COMMON USE CASES

### Case 1: Hero Section

```javascript
{
  startFrame: 0,
  endFrame: 150,
  actions: [
    // Background video
    {
      cmd: "videoView",
      id: "bgVideo",
      content: {
        video: "LoopingVideo001.mp4",
        loop: true,
        sound: false
      },
      styleCss: {
        base: "videoView.fullscreen"
      },
      animation: {
        type: "videoView.kenBurns",
        params: { duration: 150 }
      },
      ToEndFrame: true
    },

    // Hero title
    {
      cmd: "typingText",
      content: {
        text: "WELCOME",
        sound: true
      },
      styleCss: {
        base: "typingText.heroTitle"
      },
      animation: {
        type: "typingText.fadeInZoom"
      },
      delay: 30
    }
  ]
}
```

### Case 2: Image Showcase

```javascript
{
  cmd: "imageView",
  id: "mainImage",
  content: {
    img: "photo.jpg",
    imgSize: "800px"
  },
  styleCss: {
    base: "imageView.hero"
  },
  animation: {
    type: "imageView.pulse",
    params: { duration: 120 }
  }
}
```

### Case 3: Countdown

```javascript
{
  cmd: "countdown",
  content: {
    countDownFrom: 7,
    colorTheme: "orange"
  },
  styleCss: {
    override: {
      scale: "2",
      transform: "translateY(300px)"
    }
  }
}
```

### Case 4: NEW - Shape Actions

```javascript
// Image trong Star shape
{
  cmd: "imageShape",
  id: "starImage",
  content: {
    img: "photo.jpg",
    shape: "star"
  },
  styleCss: {
    base: "imageShape.star",
    override: {
      container: {
        width: "600px",
        height: "600px"
      }
    }
  },
  animation: {
    type: "imageView.rotation",
    params: { duration: 180 }
  }
}

// Text trong Hexagon shape
{
  cmd: "textShape",
  content: {
    text: "NEW",
    shape: "hexagon"
  },
  styleCss: {
    base: "textShape.hexagon"
  }
}
```

## 🔍 HOW TO DISCOVER PRESETS

### Method 1: Use actionHints

```javascript
import { actionHints } from "./utils/actionHints";

// Xem tất cả
console.log(actionHints.all());
// Output: ["typingText", "imageView", "videoView", ...]

// Xem chi tiết cho typingText
console.log(actionHints.typingText);
// Output: {
//   cmd: "typingText",
//   content: { required: [...], optional: [...] },
//   styles: { available: ["default", "bigYellow", ...] },
//   animations: { available: ["fadeIn", "slideIn", ...] },
//   example: { ... }
// }

// Search
console.log(actionHints.search("shape"));
// Output: { imageShape: {...}, textShape: {...} }
```

### Method 2: Browse preset files

```
presets/
├─ styles/
│  ├─ typingText.js    ← Xem available styles
│  ├─ imageView.js
│  └─ ...
└─ animations/
   ├─ typingText.js    ← Xem available animations
   └─ ...
```

### Method 3: Check examples

File `data_NEW_ARCHITECTURE_EXAMPLE.js` có đầy đủ examples.

## 💡 TIPS & TRICKS

### Tip 1: Start Simple

```javascript
// ✅ Good - Bắt đầu đơn giản
{
  cmd: "typingText",
  content: { text: "Hello" }
}

// ❌ Avoid - Đừng phức tạp hóa ngay từ đầu
{
  cmd: "typingText",
  content: { ... },
  styleCss: { ... },
  animation: { ... },
  parentID: "...",
  childID: "..."
}
```

### Tip 2: Use Presets First

```javascript
// ✅ Good - Dùng preset
{
  styleCss: {
    base: "typingText.bigYellow"
  }
}

// ⚠️ OK but not recommended - Hard-code
{
  styleCss: {
    fontSize: "100px",
    fontWeight: "900",
    color: "#FFD700",
    // ... 20 dòng style khác
  }
}
```

### Tip 3: Override Minimally

```javascript
// ✅ Good - Chỉ override cái cần
{
  styleCss: {
    base: "typingText.bigYellow",
    override: {
      fontSize: "120px" // Chỉ 1 field
    }
  }
}

// ❌ Avoid - Override quá nhiều
{
  styleCss: {
    base: "typingText.bigYellow",
    override: {
      fontSize: "120px",
      color: "red",
      background: "blue",
      padding: "50px",
      // ... quá nhiều overrides
    }
  }
}
```

### Tip 4: Add ID for Animations

```javascript
// ✅ Good - Có ID
{
  cmd: "imageView",
  id: "mainImage", // ⭐ Cần ID để animations target
  animation: {
    type: "imageView.pulse"
  }
}

// ⚠️ Warning - Không ID, animation không hoạt động
{
  cmd: "imageView",
  animation: {
    type: "imageView.pulse"
  }
}
```

## 🎯 CHEAT SHEET

### Typography Actions

- `typingText` - Text với typing effect
- `textShape` - Text trong shape đặc biệt

### Media Actions

- `imageView` - Hiển thị image
- `videoView` - Hiển thị video
- `imageShape` - Image trong shape đặc biệt

### Other Actions

- `countdown` - Đếm ngược
- `DivAction` - Div container
- `actionCssId` - Thay đổi CSS theo ID
- `actionCssClass` - Thay đổi CSS theo class

### Common Style Presets

- `typingText.default`
- `typingText.bigYellow`
- `typingText.heroTitle`
- `imageView.hero`
- `imageView.avatar`
- `videoView.fullscreen`
- `videoView.loopingBackground`

### Common Animation Presets

- `typingText.fadeIn`
- `typingText.slideInLeft`
- `typingText.zoomIn`
- `imageView.pulse`
- `imageView.kenBurns`
- `videoView.pan`
- `videoView.zoom`

## 📚 NEXT STEPS

1. ✅ Read MIGRATION_GUIDE.md nếu có code cũ
2. ✅ Check data_NEW_ARCHITECTURE_EXAMPLE.js cho examples
3. ✅ Explore actionHints để discover presets
4. ✅ Create your first action với new architecture
5. ✅ Tạo custom presets nếu cần

## 🆘 TROUBLESHOOTING

### Animation không hoạt động?

- Check có ID chưa: `id: "myElement"`
- Check animation config đúng format chưa
- Log actionHints để xem available animations

### Style không apply?

- Check base preset có tồn tại không
- Check override syntax đúng chưa
- Log stylePresets để xem available styles

### Action không render?

- Check cmd có đúng không
- Check có trong ACTION_REGISTRY chưa
- Check visibility (startFrame, endFrame)

## 🎉 YOU'RE READY!

Bây giờ bạn đã sẵn sàng để tạo videos với kiến trúc mới!

Happy coding! 🚀
