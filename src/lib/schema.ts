// zod schema 验证输入
import * as z from "zod";

export const facultySchema = z.object({
  name: z.string().min(2, "教师的姓名至少两个字"),
  email: z.string().email("无效的邮箱格式"),
  role: z.enum(["admin", "teacher", "student"]),
  department: z.string(),
  image: z.string().optional(),
  imageCldPubId: z.string().optional(),
});

export const subjectSchema = z.object({
  name: z.string().min(3, "学科名至少三个字"),
  code: z.string().min(5, "学科编码至少5个字"),
  description: z.string().min(5, "学科描述至少五个字"),
  department: z.string().min(2, "学科所属学院名至少两个字"),
});

const scheduleSchema = z.object({
  day: z.string().min(1, "此处不能为空"),
  startTime: z.string().min(1, "开始时间不能为空"),
  endTime: z.string().min(1, "结束时间不能为空"),
});

export const classSchema = z.object({
  name: z
    .string()
    .min(2, "课程名称不能少于2个字")
    .max(50, "课程名称不能超过50个字"),
  description: z.string().min(5, "课程描述至少5个字"),
  subjectId: z.coerce
    .number({
      required_error: "请选择学科",
      invalid_type_error: "请选择学科",
    })
    .min(1, "请选择学科"),
  teacherId: z.string().min(1, "请选择授课教师"),
  capacity: z.coerce
    .number({
      required_error: "请输入课程容量",
      invalid_type_error: "课程容量必须是数字",
    })
    .min(1, "课程容量至少为1"),
  status: z.enum(["active", "inactive"]),
  bannerUrl: z
    .string({ required_error: "请上传课程封面图" })
    .min(1, "请上传课程封面图"),
  bannerCldPubId: z
    .string({ required_error: "图片上传失败" })
    .min(1, "图片上传失败"),
  inviteCode: z.string().optional(),
  schedules: z.array(scheduleSchema).optional(),
});

export const enrollmentSchema = z.object({
  classId: z.coerce
    .number({
      required_error: "请选择课程",
      invalid_type_error: "请选择课程",
    })
    .min(1, "请选择课程"),
  studentId: z.string().min(1, "请选择学生"),
});
