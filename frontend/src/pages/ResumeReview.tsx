import { AlertCircle, CheckCircle2, Award, Target } from "lucide-react";

export interface ResumeAnalysisData {
  score_metrics: {
    ats_score: number;
    keyword_match: string;
  };
  critical_fixes: Array<{
    type: string;
    issue: string;
    description: string;
    priority: "High" | "Medium" | "Low";
  }>;
  keyword_analysis: {
    found: string[];
    missing: string[];
  };
  fresher_logic: {
    academic_strength: string;
    project_score: string;
  };
}

const ResumeReviewUI = (data: ResumeAnalysisData) => {
  if (!data) return null;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8 bg-slate-50 min-h-screen">
      {/* 1. Header & Score Gauge */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center">
          <h3 className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-2">
            Overall ATS Score
          </h3>
          <div className="relative flex items-center justify-center">
            <svg className="w-32 h-32">
              <circle
                className="text-slate-100"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="58"
                cx="64"
                cy="64"
              />
              <circle
                className="text-indigo-600"
                strokeWidth="8"
                strokeDasharray={364}
                strokeDashoffset={
                  364 - (364 * data.score_metrics.ats_score) / 100
                }
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="58"
                cx="64"
                cy="64"
              />
            </svg>
            <span className="absolute text-3xl font-black text-slate-800">
              {data.score_metrics.ats_score}%
            </span>
          </div>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <Target className="text-indigo-600 w-5 h-5" />
            <h3 className="font-bold text-slate-800">Executive Summary</h3>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            {data.score_metrics.keyword_match}
          </p>
        </div>
      </div>

      {/* 2. Critical Fixes (The Priority Section) */}
      <section>
        <h2 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
          <AlertCircle className="text-red-500" /> Improvement Roadmap
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {data.critical_fixes.map((fix, idx) => (
            <div
              key={idx}
              className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-indigo-600 uppercase mb-1">
                    {fix.type}
                  </span>
                  <h4 className="font-bold text-slate-800 text-lg">
                    {fix.issue}
                  </h4>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    fix.priority === "High"
                      ? "bg-red-100 text-red-600"
                      : "bg-amber-100 text-amber-600"
                  }`}
                >
                  {fix.priority} Priority
                </span>
              </div>
              <p className="text-slate-600 text-sm">{fix.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Skills & Academic Logic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Keywords */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <CheckCircle2 className="text-emerald-500 w-5 h-5" /> Keyword
            Analysis
          </h3>
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-3">
                Identified Strengths
              </p>
              <div className="flex flex-wrap gap-2">
                {data.keyword_analysis.found.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-3">
                Missing Potential
              </p>
              <div className="flex flex-wrap gap-2">
                {data.keyword_analysis.missing.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-xs font-medium border border-slate-100"
                  >
                    + {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fresher Specifics */}
        <div className="bg-indigo-600 p-6 rounded-3xl shadow-lg text-white">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <Award className="text-indigo-200 w-5 h-5" /> Candidate Potential
          </h3>
          <div className="space-y-6">
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <h4 className="text-xs font-bold text-indigo-200 uppercase mb-2">
                Academic Standing
              </h4>
              <p className="text-sm leading-relaxed">
                {data.fresher_logic.academic_strength}
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <h4 className="text-xs font-bold text-indigo-200 uppercase mb-2">
                Project Maturity
              </h4>
              <p className="text-sm leading-relaxed">
                {data.fresher_logic.project_score}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeReviewUI;
