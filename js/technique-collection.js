import { knowledgeNodes } from "./knowledge-data.js";

const REAL = "images/techniques/collection/real/";
const detailByName = new Map(
  knowledgeNodes
    .filter((node) => node.category === "technique")
    .map((node) => [node.name, node.description])
);

const leaf = (name, code, summary, count) => ({
  name,
  summary,
  desc: detailByName.get(name) || summary,
  examples: Array.from({ length: count }, (_, index) => ({
    img: `${REAL}t${code}_${String(index + 1).padStart(2, "0")}.jpg`,
    title: `${name} 实物 ${String(index + 1).padStart(2, "0")}`,
    meta: "技艺实物参考",
    desc: `${name}工艺实物，可观察其材料、髹涂与装饰效果。`
  }))
});

export const techniqueCollection = [
  {
    name: "基础单色类",
    desc: "从胎体、髹漆到推光的基础工法，以漆色和器形呈现漆器质感。",
    children: [
      leaf("素髹", "01", "不施纹样，以均匀漆层和温润光泽取胜。", 2)
    ]
  },
  {
    name: "描绘类",
    desc: "以色漆、金粉或刻线在漆面组织线条与色块，构成漆器的绘画性装饰。",
    children: [
      leaf("彩绘/描漆", "02", "以色漆在髹好的漆地上描绘纹样，色彩丰富而层次鲜明。", 3),
      leaf("描金/识文", "03", "以金粉、金箔或堆起的阳线装饰漆面，显出华贵的金色纹样。", 3),
      leaf("戗金/填漆", "04", "先刻线或刻槽，再填入金、银或色漆，使纹样沉入漆面。", 3)
    ]
  },
  {
    name: "雕镂类",
    desc: "在厚积漆层或漆灰地上施刀剔刻，以刀口、层色和起伏塑造纹样。",
    children: [
      leaf("雕漆/剔红等", "05", "层层积漆后剔刻浮雕纹样，刀法圆润、漆层厚重。", 3),
      leaf("剔黑", "06", "以黑漆为主的雕漆品种，深沉漆色衬出细密刀法。", 2),
      leaf("剔犀", "07", "交替髹涂朱、黑等色漆，再剔出如意云纹，断面显出层层色带。", 3),
      leaf("剔彩", "08", "多色漆层交替积累后剔刻，纹样断面呈现丰富彩色层次。", 2),
      leaf("剔犀云纹", "09", "以斜刀剔出回旋如意云钩，让朱黑色带随刀口流动。", 3),
      leaf("款彩", "10", "在漆灰地上刻出线条与块面，再填色、贴金并磨平。", 4)
    ]
  },
  {
    name: "镶嵌类",
    desc: "将贝壳、金银或玉石等材料切磨后嵌入漆面，借材质光泽丰富装饰效果。",
    children: [
      leaf("薄螺钿", "11", "以极薄贝片贴合曲面，细密轻巧地呈现流动的螺钿光泽。", 2),
      leaf("金银平脱", "12", "将金银片贴入漆层并反复髹漆打磨，使金属与漆面齐平。", 2),
      leaf("百宝嵌", "13", "综合玉石、玛瑙、珊瑚等多种材料拼嵌成花鸟人物与器物。", 4)
    ]
  },
  {
    name: "斑纹肌理类",
    desc: "利用漆层流动、堆叠与打磨形成自然斑纹，每件器物都具有独特肌理。",
    children: [
      leaf("犀皮漆", "14", "通过起伏漆层与多色髹涂、打磨，形成仿佛犀皮的斑驳纹理。", 3)
    ]
  },
  {
    name: "地方特色类",
    desc: "由地域材料、胎体和传承工序共同形成的漆艺特色，体现地方工坊传统。",
    children: [
      leaf("脱胎/薄料", "15", "以布或纸脱去胎骨制成轻薄器体，再反复髹漆成器。", 2),
      leaf("推光漆", "16", "以手掌和细腻材料反复推磨，使漆面获得含蓄而明亮的光泽。", 3)
    ]
  }
];
