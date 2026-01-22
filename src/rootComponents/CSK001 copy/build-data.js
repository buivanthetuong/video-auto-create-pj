import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load JSON file
const DataFront = JSON.parse(
  readFileSync(join(__dirname, "./data_Front_001.json"), "utf-8"),
);

let videoData01 = [];
let QSAWPX = 0;

DataFront.forEach((groupArray) => {
  const colorSets = ["blue", "yellow"];
  let processedGroup = [{}];

  groupArray = groupArray.concat({
    action: "FOLLOW",
    text: "Hãy follow",
    code: "SOUNDCHUNG_SpaceSound",
    imgHook: "CSK_001.png",
    timeFixed: 3,
  });

  groupArray.forEach((e, i) => {
    let temOBJ = e;
    let actionsSETS = [];

    if (e.id) {
      temOBJ.IDMark = e.id;
    }
    if (e.class) {
      temOBJ.ClassMark = e.class;
    }

    if (e.action) {
      if (e.action === "DEMNGUOC") {
        actionsSETS.push({
          cmd: "countdown",
          countDownFrom: 7,
          colorTheme: "orange",
          zIndex: 100,
          styleCss: { scale: "2", transform: "translateY(300px)" },
        });
        temOBJ.code = "SOUNDCHUNG_tiktok-dongho";
        temOBJ.timeFixed = 7;
      }

      if (e.action === "Hook") {
        actionsSETS.push({
          cmd: "typingText",
          text: e.text,
          sound: true,
          noTyping: false,
          styleCss: {
            marginTop: "100px",
            padding: "40px 60px",
            fontSize: "100px",
            fontWeight: "900",
            color: "#FFD700",
            textAlign: "center",
            background: "rgba(0,0,0,0.75)",
            borderRadius: "20px",
            border: "6px solid #FFD700",
            boxShadow: `0 0 20px #FFD700, 0 0 40px rgba(255,215,0,0.6)`,
            textTransform: "uppercase",
            letterSpacing: "2px",
          },
        });
        temOBJ.timeFixed = 4;
        processedGroup[0].code = "SOUNDCHUNG_SpaceSound";
        processedGroup[0].timeFixed = 1;
        processedGroup[0].actions = [
          {
            cmd: "typingText",
            text: e.text,
            sound: true,
            noTyping: true,
            styleCss: {
              marginTop: "100px",
              padding: "40px 60px",
              fontSize: "100px",
              fontWeight: "900",
              color: "#FFD700",
              textAlign: "center",
              background: "rgba(0,0,0,0.75)",
              borderRadius: "20px",
              border: "6px solid #FFD700",
              boxShadow: `0 0 20px #FFD700, 0 0 40px rgba(255,215,0,0.6)`,
              textTransform: "uppercase",
              letterSpacing: "2px",
            },
          },
        ];
      }

      if (e.action === "FOLLOW") {
        actionsSETS.push({
          cmd: "typingText",
          text: e.text,
          sound: true,
          noTyping: true,
          styleCss: {
            marginTop: "100px",
            padding: "40px 60px",
            fontSize: "100px",
            fontWeight: "900",
            color: "#FFD700",
            textAlign: "center",
            background: "rgba(0,0,0,0.75)",
            borderRadius: "20px",
            border: "6px solid #FFD700",
            boxShadow: `0 0 20px #FFD700, 0 0 40px rgba(255,215,0,0.6)`,
            textTransform: "uppercase",
            letterSpacing: "2px",
          },
        });
        temOBJ.timeFixed = 4;
        processedGroup[0].code = "SOUNDCHUNG_SpaceSound";
        processedGroup[0].timeFixed = 1;
        processedGroup[0].actions = [
          {
            cmd: "typingText",
            text: e.text,
            sound: true,
            noTyping: true,
            styleCss: {
              marginTop: "100px",
              padding: "40px 60px",
              fontSize: "100px",
              fontWeight: "900",
              color: "#FFD700",
              textAlign: "center",
              background: "rgba(0,0,0,0.75)",
              borderRadius: "20px",
              border: "6px solid #FFD700",
              boxShadow: `0 0 20px #FFD700, 0 0 40px rgba(255,215,0,0.6)`,
              textTransform: "uppercase",
              letterSpacing: "2px",
            },
          },
        ];
      }

      if (e.action === "HINHNEN") {
        actionsSETS.push({
          cmd: "typingText",
          text: e.text,
          sound: true,
          noTyping: true,
          styleCss: {
            marginTop: "100px",
            padding: "40px 60px",
            fontSize: "100px",
            fontWeight: "900",
            color: "#FFD700",
            textAlign: "center",
            background: "rgba(0,0,0,0.75)",
            borderRadius: "20px",
            border: "6px solid #FFD700",
            boxShadow: `0 0 20px #FFD700, 0 0 40px rgba(255,215,0,0.6)`,
            textTransform: "uppercase",
            letterSpacing: "2px",
          },
        });
        temOBJ.timeFixed = 4;
      }

      if (e.action === "CHONDAPAN") {
        actionsSETS.push({
          cmd: "actionCssId",
          toID: "DUNG",
          cssMode: "add",
          css: {
            backgroundColor: "yellow",
            background: "yellow",
            color: "black",
          },
        });
      }

      if (e.action === "QSAW") {
        let topPX = 0;
        if (QSAWPX === 1) {
          topPX = 50 + QSAWPX * 350 + "px";
        } else {
          topPX = 50 + QSAWPX * 250 + "px";
        }
        QSAWPX++;

        if (QSAWPX === 4) {
          actionsSETS.push({
            cmd: "actionCssId",
            toID: "OPACITY",
            cssMode: "replace",
            css: {
              transform: "scale(1.5) translateX(-200px)",
              transition: "transform 3s ease-in-out",
            },
          });
        }

        actionsSETS.push({
          cmd: "typingText",
          text: e.text,
          sound: true,
          noTyping: true,
          ToEndFrame: true,
          styleCss: {
            position: "absolute",
            top: topPX,
            fontSize: "60px",
            color: "black",
            borderTop: "1px solid black",
            borderRadius: "20px",
            textAlign: "left",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "20px",
            lineHeight: 1.35,
            letterSpacing: "0.5px",
            color: "#ffffff",
          },
        });
      }

      if (e.action === "END") {
        actionsSETS.push({
          cmd: "actionCssClass",
          toClass: "AN",
          cssMode: "replace",
          css: {
            opacity: 0,
          },
        });
        actionsSETS.push({
          cmd: "typingText",
          text: e.text,
          sound: true,
          styleCss: {
            position: "absolute",
            top: "100px",
            fontSize: "70px",
            borderTop: "1px solid black",
            borderRadius: "20px",
            textAlign: "left",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "20px",
            lineHeight: 1.75,
            letterSpacing: "0.5px",
            color: "#ffffff",
          },
        });
      }
    }

    temOBJ.actions = actionsSETS;
    processedGroup.push(temOBJ);
  });

  videoData01.push(processedGroup);
});

// ✅ Save processed data to JSON file
const outputPath = join(__dirname, "./data_processed.json");
writeFileSync(outputPath, JSON.stringify(videoData01, null, 2));

console.log(`✅ Data processed and saved to: ${outputPath}`);
console.log(`📊 Total videos: ${videoData01.length}`);
