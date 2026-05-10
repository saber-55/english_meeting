import React, { useEffect, useRef, useState } from "react";
import { builtInQuestions, categories, difficulties } from "./data/questions";

const sections = [
  {
    title: "随机抽题区",
    description: "按分类和难度筛选面试题，随机抽取题目并进行朗读训练。"
  },
  {
    title: "答题训练区",
    description: "输入英文回答，对照参考答案，并标记当前题目的掌握情况。"
  },
  {
    title: "私人题库",
    description: "添加自己的英语面试题，并保存在当前浏览器本地。"
  },
  {
    title: "答题历史",
    description: "查看已保存的回答记录、日期、分类和掌握状态。"
  },
  {
    title: "设置",
    description: "控制抽题来源、自动朗读、语速、分类和难度。"
  }
];

const categoryLabels = {
  "Self Introduction": "自我介绍",
  "Academic Background": "学业背景",
  "Research Experience": "科研经历",
  "Project Experience": "项目经历",
  "Competition Experience": "竞赛经历",
  "Graduate Study Plan": "读研规划",
  "Supervisor Matching": "导师匹配",
  "Professional Knowledge": "专业知识",
  "Stress Questions": "压力问题",
  "Follow-up Questions": "追问问题"
};

const getCategoryLabel = (category) => categoryLabels[category] || category;

function App() {
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState("");
  const [recordingError, setRecordingError] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [questionSource, setQuestionSource] = useState("Built-in Questions");
  const [showEnglishQuestion, setShowEnglishQuestion] = useState(false);
  const [showChineseTranslation, setShowChineseTranslation] = useState(false);
  const [showReferenceAnswer, setShowReferenceAnswer] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [speechRate, setSpeechRate] = useState(1);
  const [speechError, setSpeechError] = useState("");
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState("");
  const [interviewerMode, setInterviewerMode] = useState(true);
  const [privateQuestions, setPrivateQuestions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("privateQuestions") || "[]");
    } catch {
      return [];
    }
  });
  const [privateQuestionForm, setPrivateQuestionForm] = useState({
    question: "",
    translation: "",
    category: categories[0],
    difficulty: "Easy",
    referenceAnswer: "",
    tags: ""
  });
  const [translationStatus, setTranslationStatus] = useState("");

  useEffect(() => {
    if (!window.speechSynthesis) return;

    const loadVoices = () => {
      const englishVoices = window.speechSynthesis
        .getVoices()
        .filter((voice) => voice.lang?.toLowerCase().startsWith("en"));

      setAvailableVoices(englishVoices);

      if (!selectedVoiceName && englishVoices.length > 0) {
        const preferredVoice =
          englishVoices.find((voice) => /natural|online|aria|jenny|guy/i.test(voice.name)) ||
          englishVoices.find((voice) => voice.lang === "en-US") ||
          englishVoices[0];
        setSelectedVoiceName(preferredVoice.name);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [selectedVoiceName]);

  useEffect(() => {
    localStorage.setItem("privateQuestions", JSON.stringify(privateQuestions));
  }, [privateQuestions]);

  const handlePrivateQuestionChange = (field, value) => {
    setPrivateQuestionForm((current) => ({
      ...current,
      [field]: value
    }));
  };

  const translateQuestionToChinese = async (text) => {
    const trimmedText = text.trim();
    if (!trimmedText) return "";

    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmedText)}&langpair=en|zh-CN`
    );

    if (!response.ok) {
      throw new Error("Translation request failed.");
    }

    const data = await response.json();
    return data?.responseData?.translatedText?.trim() || "";
  };

  const handleAutoTranslatePrivateQuestion = async () => {
    const trimmedQuestion = privateQuestionForm.question.trim();
    if (!trimmedQuestion) {
      setTranslationStatus("请先输入英文题目。");
      return;
    }

    setTranslationStatus("正在自动翻译...");

    try {
      const translation = await translateQuestionToChinese(trimmedQuestion);
      if (!translation) {
        setTranslationStatus("没有获取到翻译结果，可以手动填写中文翻译。");
        return;
      }

      setPrivateQuestionForm((current) => ({
        ...current,
        translation
      }));
      setTranslationStatus("已生成中文翻译，可按需手动修改。");
    } catch {
      setTranslationStatus("自动翻译暂时不可用，可以手动填写中文翻译。");
    }
  };

  const handleAddPrivateQuestion = async (event) => {
    event.preventDefault();

    const trimmedQuestion = privateQuestionForm.question.trim();
    if (!trimmedQuestion) return;

    let translation = privateQuestionForm.translation.trim();
    if (!translation) {
      try {
        setTranslationStatus("正在自动翻译...");
        translation = await translateQuestionToChinese(trimmedQuestion);
      } catch {
        translation = "";
      }
    }

    const newQuestion = {
      id: `private-${Date.now()}`,
      category: privateQuestionForm.category,
      difficulty: privateQuestionForm.difficulty,
      question: trimmedQuestion,
      translation,
      referenceAnswer: privateQuestionForm.referenceAnswer.trim(),
      tags: privateQuestionForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    };

    setPrivateQuestions((current) => [newQuestion, ...current]);
    setPrivateQuestionForm({
      question: "",
      translation: "",
      category: categories[0],
      difficulty: "Easy",
      referenceAnswer: "",
      tags: ""
    });
    setTranslationStatus("");
  };

  const handleDeletePrivateQuestion = (id) => {
    setPrivateQuestions((current) => current.filter((question) => question.id !== id));

    if (currentQuestion?.id === id) {
      setCurrentQuestion(null);
      setShowEnglishQuestion(false);
      setShowChineseTranslation(false);
      setShowReferenceAnswer(false);
      stopCurrentSpeech();
    }
  };

  const getQuestionPool = () => {
    if (questionSource === "My Private Questions") {
      return privateQuestions;
    }

    if (questionSource === "Mixed") {
      return [...builtInQuestions, ...privateQuestions];
    }

    return builtInQuestions;
  };

  const getFilteredQuestions = () => {
    return getQuestionPool().filter((question) => {
      const categoryMatched = selectedCategory === "All" || question.category === selectedCategory;
      const difficultyMatched = selectedDifficulty === "All" || question.difficulty === selectedDifficulty;
      return categoryMatched && difficultyMatched;
    });
  };

  const handleNextQuestion = () => {
    const pool = getFilteredQuestions();

    if (pool.length === 0) {
      setCurrentQuestion(null);
      setShowEnglishQuestion(false);
      setShowChineseTranslation(false);
      setShowReferenceAnswer(false);
      stopCurrentSpeech();
      return;
    }

    const nextQuestion = pool[Math.floor(Math.random() * pool.length)];
    setCurrentQuestion(nextQuestion);
    setShowEnglishQuestion(false);
    setShowChineseTranslation(false);
    setShowReferenceAnswer(false);

    if (autoSpeak) {
      setTimeout(() => {
        speakQuestion(nextQuestion.question);
      }, 100);
    }
  };

  const stopCurrentSpeech = () => {
    window.speechSynthesis?.cancel();
  };

  const speakQuestion = (text) => {
    if (!text) return;

    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      setSpeechError("当前浏览器不支持英文朗读功能，请使用最新版 Chrome 或 Edge。");
      return;
    }

    stopCurrentSpeech();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = interviewerMode ? Math.max(0.75, speechRate - 0.08) : speechRate;
    utterance.pitch = interviewerMode ? 0.92 : 1;
    utterance.volume = 1;

    const selectedVoice = availableVoices.find((voice) => voice.name === selectedVoiceName);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    }

    window.speechSynthesis.speak(utterance);
  };

  const handleReplay = () => {
    speakQuestion(currentQuestion?.question);
  };

  const getRecordingErrorMessage = (error) => {
    if (error?.name === "NotAllowedError" || error?.name === "SecurityError") {
      return "麦克风权限被拒绝。请在浏览器地址栏左侧的站点权限中允许麦克风，然后刷新页面重试。";
    }

    if (error?.name === "NotFoundError" || error?.name === "DevicesNotFoundError") {
      return "没有检测到可用麦克风。请确认电脑已连接麦克风，并且系统输入设备可用。";
    }

    if (error?.name === "NotReadableError" || error?.name === "TrackStartError") {
      return "麦克风当前被其他应用占用。请关闭正在使用麦克风的软件后重试。";
    }

    if (error?.name === "OverconstrainedError") {
      return "当前麦克风不满足浏览器录音要求，请切换输入设备后重试。";
    }

    return `无法开始录音：${error?.name || "未知错误"}。请检查麦克风权限后重试。`;
  };

  const handleStartRecording = async () => {
    setRecordingError("");

    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      setRecordingError("当前浏览器不支持录音功能，请使用最新版 Chrome 或 Edge。");
      return;
    }

    let stream;

    try {
      if (recordingUrl) {
        URL.revokeObjectURL(recordingUrl);
        setRecordingUrl("");
      }

      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        setRecordingUrl(URL.createObjectURL(audioBlob));
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      stream?.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      setRecordingError(getRecordingErrorMessage(error));
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            英语口语面试训练
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Postgraduate English Interview Trainer
          </h1>
          <p className="max-w-3xl text-base leading-7 text-slate-600">
            面向保研英语口语面试的自学训练工具，支持随机抽题、答题练习、私人题库管理和历史复盘。
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[1.4fr_0.9fr] lg:px-8">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">随机抽题区</h2>
              <p className="mt-1 text-sm text-slate-500">这里将显示当前抽取到的英文面试题。</p>
            </div>
            <button
              className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800"
              onClick={handleNextQuestion}
            >
              下一题
            </button>
          </div>

          <div className="rounded-lg border border-teal-100 bg-teal-50 p-5">
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-teal-800 ring-1 ring-teal-200">
                {currentQuestion ? getCategoryLabel(currentQuestion.category) : "分类"}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
                {currentQuestion?.difficulty || "难度"}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
                当前可抽 {getFilteredQuestions().length} 题
              </span>
            </div>
            {currentQuestion ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-slate-600">英文题目</p>
                  {showEnglishQuestion ? (
                    <p className="mt-2 text-2xl font-semibold leading-9 text-slate-950">
                      {currentQuestion.question}
                    </p>
                  ) : (
                    <div className="mt-2 rounded-md border border-dashed border-teal-300 bg-white/70 p-5 text-center text-sm font-medium text-slate-500">
                      英文题目已遮盖，点击下方按钮显示。
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-600">中文翻译</p>
                  {showChineseTranslation ? (
                    <p className="mt-2 rounded-md bg-white p-4 text-base leading-7 text-slate-700">
                      {currentQuestion.translation}
                    </p>
                  ) : (
                    <div className="mt-2 rounded-md border border-dashed border-slate-300 bg-white/70 p-4 text-center text-sm font-medium text-slate-500">
                      中文翻译默认隐藏，可按需显示。
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                    onClick={() => setShowEnglishQuestion((value) => !value)}
                  >
                    {showEnglishQuestion ? "隐藏英文题目" : "显示英文题目"}
                  </button>
                  <button
                    className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    onClick={() => setShowChineseTranslation((value) => !value)}
                  >
                    {showChineseTranslation ? "隐藏中文翻译" : "显示中文翻译"}
                  </button>
                  <button
                    className="rounded-md border border-teal-700 bg-white px-4 py-2 text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
                    onClick={handleReplay}
                  >
                    Replay 朗读
                  </button>
                </div>
                {speechError ? (
                  <p className="text-sm font-medium text-red-600">{speechError}</p>
                ) : null}
              </div>
            ) : (
              <p className="text-2xl font-semibold leading-9 text-slate-950">
                点击“下一题”开始保研英语口语面试训练。
              </p>
            )}
          </div>
        </section>

        <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">设置</h2>
          <div className="mt-4 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">抽题来源</span>
              <select
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                value={questionSource}
                onChange={(event) => setQuestionSource(event.target.value)}
              >
                <option value="Built-in Questions">内置题库</option>
                <option value="My Private Questions">我的私人题库</option>
                <option value="Mixed">混合抽题</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">题目分类</span>
              <select
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                <option value="All">全部分类</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {getCategoryLabel(category)}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">题目难度</span>
              <select
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                value={selectedDifficulty}
                onChange={(event) => setSelectedDifficulty(event.target.value)}
              >
                <option value="All">全部难度</option>
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="flex items-center justify-between gap-3 text-sm font-medium text-slate-700">
                自动朗读
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-600"
                  checked={autoSpeak}
                  onChange={(event) => setAutoSpeak(event.target.checked)}
                />
              </span>
              <p className="mt-1 text-xs text-slate-500">开启后点击“下一题”会自动朗读新题目。</p>
            </label>
            <label className="block">
              <span className="flex items-center justify-between gap-3 text-sm font-medium text-slate-700">
                面试官语气
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-600"
                  checked={interviewerMode}
                  onChange={(event) => setInterviewerMode(event.target.checked)}
                />
              </span>
              <p className="mt-1 text-xs text-slate-500">语速略慢、音调略低，更接近正式提问。</p>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">英语语音</span>
              <select
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                value={selectedVoiceName}
                onChange={(event) => setSelectedVoiceName(event.target.value)}
              >
                {availableVoices.length === 0 ? (
                  <option value="">使用浏览器默认语音</option>
                ) : (
                  availableVoices.map((voice) => (
                    <option key={`${voice.name}-${voice.lang}`} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))
                )}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">朗读语速</span>
              <select
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                value={speechRate}
                onChange={(event) => setSpeechRate(Number(event.target.value))}
              >
                <option value={0.8}>0.8</option>
                <option value={1}>1.0</option>
                <option value={1.2}>1.2</option>
              </select>
            </label>
          </div>
        </aside>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">答题训练区</h2>
          <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-800">录音回答</p>
                <p className="mt-1 text-sm text-slate-500">
                  点击开始录音，用英语回答当前题目；停止后可立即回放。
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                  disabled={isRecording}
                  onClick={handleStartRecording}
                >
                  开始录音
                </button>
                <button
                  className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                  disabled={!isRecording}
                  onClick={handleStopRecording}
                >
                  停止录音
                </button>
              </div>
            </div>

            <div className="mt-4 rounded-md border border-dashed border-slate-300 bg-white p-4">
              {isRecording ? (
                <p className="text-sm font-medium text-red-600">正在录音中，请用英语作答...</p>
              ) : recordingUrl ? (
                <audio className="w-full" controls src={recordingUrl}>
                  当前浏览器不支持音频播放。
                </audio>
              ) : (
                <p className="text-sm text-slate-500">还没有录音，点击“开始录音”后开始作答。</p>
              )}
            </div>

            {recordingError ? (
              <p className="mt-3 text-sm font-medium text-red-600">{recordingError}</p>
            ) : null}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
              disabled={!currentQuestion?.referenceAnswer}
              onClick={() => setShowReferenceAnswer((value) => !value)}
              type="button"
            >
              {showReferenceAnswer ? "隐藏参考答案" : "显示参考答案"}
            </button>
          </div>
          {showReferenceAnswer && currentQuestion?.referenceAnswer ? (
            <div className="mt-4 rounded-md border border-teal-100 bg-teal-50 p-4">
              <p className="text-sm font-semibold text-slate-700">参考答案</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{currentQuestion.referenceAnswer}</p>
            </div>
          ) : null}
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">私人题库</h2>
          <form className="mt-4 space-y-3" onSubmit={handleAddPrivateQuestion}>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">英文题目</span>
              <textarea
                className="mt-1 min-h-24 w-full resize-y rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                value={privateQuestionForm.question}
                onChange={(event) => handlePrivateQuestionChange("question", event.target.value)}
                placeholder="Enter your private interview question..."
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">中文翻译</span>
              <textarea
                className="mt-1 min-h-20 w-full resize-y rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                value={privateQuestionForm.translation}
                onChange={(event) => handlePrivateQuestionChange("translation", event.target.value)}
                placeholder="可自动翻译，也可以手动填写或修改..."
              />
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <button
                className="rounded-md border border-teal-700 bg-white px-4 py-2 text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
                onClick={handleAutoTranslatePrivateQuestion}
                type="button"
              >
                自动翻译成中文
              </button>
              {translationStatus ? (
                <span className="text-sm text-slate-500">{translationStatus}</span>
              ) : null}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">分类</span>
                <select
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  value={privateQuestionForm.category}
                  onChange={(event) => handlePrivateQuestionChange("category", event.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {getCategoryLabel(category)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">难度</span>
                <select
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  value={privateQuestionForm.difficulty}
                  onChange={(event) => handlePrivateQuestionChange("difficulty", event.target.value)}
                >
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">参考答案</span>
              <textarea
                className="mt-1 min-h-24 w-full resize-y rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                value={privateQuestionForm.referenceAnswer}
                onChange={(event) => handlePrivateQuestionChange("referenceAnswer", event.target.value)}
                placeholder="Optional reference answer..."
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">标签</span>
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                value={privateQuestionForm.tags}
                onChange={(event) => handlePrivateQuestionChange("tags", event.target.value)}
                placeholder="tag1, tag2, tag3"
              />
            </label>

            <button
              className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              disabled={!privateQuestionForm.question.trim()}
              type="submit"
            >
              添加到私人题库
            </button>
          </form>

          <div className="mt-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="font-semibold text-slate-950">已保存题目</h3>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {privateQuestions.length} 题
              </span>
            </div>

            {privateQuestions.length === 0 ? (
              <div className="rounded-md border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                还没有私人题目。添加后可在“我的私人题库”或“混合抽题”中抽到。
              </div>
            ) : (
              <div className="space-y-3">
                {privateQuestions.map((question) => (
                  <article key={question.id} className="rounded-md border border-slate-200 p-4">
                    <div className="mb-2 flex flex-wrap gap-2">
                      <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-800">
                        {getCategoryLabel(question.category)}
                      </span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                        {question.difficulty}
                      </span>
                    </div>
                    <p className="text-sm font-semibold leading-6 text-slate-900">{question.question}</p>
                    {question.translation ? (
                      <p className="mt-2 rounded-md bg-slate-50 p-3 text-sm leading-6 text-slate-600">
                        {question.translation}
                      </p>
                    ) : null}
                    {question.referenceAnswer ? (
                      <p className="mt-2 text-sm leading-6 text-slate-500">{question.referenceAnswer}</p>
                    ) : null}
                    {question.tags.length > 0 ? (
                      <p className="mt-2 text-xs text-slate-400">Tags: {question.tags.join(", ")}</p>
                    ) : null}
                    <button
                      className="mt-3 rounded-md border border-red-200 bg-white px-3 py-1.5 text-sm font-semibold text-red-700 transition hover:bg-red-50"
                      onClick={() => handleDeletePrivateQuestion(question.id)}
                      type="button"
                    >
                      删除
                    </button>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-semibold text-slate-950">答题历史</h2>
          <div className="mt-4 rounded-md border border-dashed border-slate-300 p-5 text-sm text-slate-500">
            保存后的答题记录会显示在这里。
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-5">
          {sections.map((section) => (
            <article key={section.title} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="font-semibold text-slate-950">{section.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{section.description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export default App;
