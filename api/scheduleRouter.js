import express from "express";

// let schedule = [
//   ["Pirmadienio pirma pamoka", "Pirmadienio antra pamoka"],
//   ["Antradienio pirma pamoka", "Antradienio antra pamoka"],
//   ["Treciadienio pirma pamoka", "Treciadienio antra pamoka"],
//   ["Ketvirtadienio pirma pamoka", "Ketvirtadienio antra pamoka"],
//   ["Penktadienio pirma pamoka", "Penktadienio antra pamoka"],
//   [],
//   [],
// ];
let schedule = [];

export const scheduleRouter = express();

scheduleRouter.get("/", (req, res) => {
  return res.status(200).json({ schedule });
});
scheduleRouter.get("/:dayID", (req, res) => {
  const { dayID } = req.params;
  const response = schedule[parseInt(dayID) - 1];
  return res.status(200).json({ schedule: response });
});

scheduleRouter.post("/", (req, res) => {
  schedule.push(...req.body.schedule);

  return res.status(201).send({
    status: "succes",
    msg: "new schedule inserted",
  });
});

scheduleRouter.put("/:dayID", (req, res) => {
  const { dayID } = req.params;
  const { newDay } = req.body;

  const index = parseInt(dayID) - 1;

  if (index >= 0 && index < schedule.length) {
    schedule[index] = newDay;

    return res.status(200).send({
      status: "success",
      msg: "Schedule successfully updated",
    });
  }

  return res.status(404).send({
    status: "error",
    msg: "Day not found",
  });
});

scheduleRouter.patch("/:dayID/:lessonID", (req, res) => {
  const { dayID, lessonID } = req.params;
  const { newLesson } = req.body;

  const dayIndex = parseInt(dayID) - 1;
  const lessonIndex = parseInt(lessonID) - 1;

  if (
    dayIndex >= 0 &&
    dayIndex < schedule.length &&
    lessonIndex >= 0 &&
    lessonIndex <= schedule[dayIndex].length
  ) {
    schedule[dayIndex][lessonIndex] = newLesson;

    return res.status(200).send({
      status: "success",
      msg: "Lesson successfully updated",
    });
  }

  return res.status(404).send({
    status: "error",
    msg: "Day or lesson not found",
  });
});

scheduleRouter.delete("/:dayID", (req, res) => {
  const { dayID } = req.params;
  const index = parseInt(dayID) - 1;

  if (index >= 0 && index < schedule.length) {
    schedule[index] = [];

    return res.status(200).send({
      status: "success",
      msg: "Day successfully deleted",
    });
  }

  return res.status(404).send({
    status: "error",
    msg: "Day not found",
  });
});
