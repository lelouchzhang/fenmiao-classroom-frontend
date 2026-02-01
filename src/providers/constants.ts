import { Subject } from "@/types";

export const API_URL = "https://api.fake-rest.refine.dev";

export const mockSubjectsData: Subject[] = [
  {
    id: 1,
    code: "CS101",
    name: "计算机科学导论",
    description:
      "本课程介绍计算机科学的基本概念，包括算法、数据结构、编程基础和计算机系统原理。",
    department: "计算机学院",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    code: "MATH201",
    name: "高等数学",
    description:
      "涵盖微积分、线性代数和概率论的基础知识，为工程和科学课程提供数学基础。",
    department: "数学与统计学院",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    code: "PHY150",
    name: "大学物理",
    description:
      "介绍力学、热学、电磁学和光学的基本原理，培养学生的物理思维和实验能力。",
    department: "物理学院",
    createdAt: new Date().toISOString(),
  },
];
