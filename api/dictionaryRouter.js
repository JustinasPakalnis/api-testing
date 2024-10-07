import express from "express";

let dictionary = [];

export const dictionaryRouter = express();

dictionaryRouter.get("/", (req, res) => {
  return res.status(200).json({ dictionary });
});

dictionaryRouter.post("/", (req, res) => {
  console.log(req.body);
  if (dictionary.includes(req.body.word)) {
    return res.status(400).send({
      status: "error",
      msg: "Toks zodis jau egzistuoja",
    });
  }
  // if (typeof req.body.word) {
  //   return res.status(400).send({
  //     status: "error",
  //     msg: "Turi buti tik tekso tipo informacija",
  //   });
  // }

  dictionary.push(req.body.word);
  return res.status(201).send({
    status: "succes",
    msg: "new word inserted",
  });
});
console.log(dictionary);

dictionaryRouter.put("/:word", (req, res) => {
  const { newWord } = req.body;
  const { word } = req.params;

  for (let i = 0; i < dictionary.length; i++) {
    if (dictionary[i].toLowerCase() === word.toLowerCase()) {
      dictionary[i] = newWord;
      return res.status(200).send({
        status: "success",
        msg: "Žodis sėkmingai atnaujintas",
      });
    }
  }

  return res.status(404).send({
    status: "error",
    msg: "Žodis nerastas",
  });
});

dictionaryRouter.all("*", (req, res) => {
  return res.json({
    status: "error",
    msg: "Kazkas not good",
  });
});
// http://localhost:5114/api/dictionary/zodis
// http://localhost:5114/api/dictionary/1

dictionaryRouter.delete("/:word", (req, res) => {
  console.log(req.params);
  if (!dictionary.includes(req.params.word)) {
    return res.status(400).send({
      status: "error",
      msg: "Toks zodis neegzistuoja",
    });
  }

  dictionary = dictionary.filter((w) => w !== req.params.word);

  return res.status(200).send({
    status: "error",
    msg: "Toks zodis sekmingai istrintas",
  });
});
