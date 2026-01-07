import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import ResponseCard from "./ResponseCard";
import AiResponse from "./AiResponse";
import type { ResumeAnalysisData } from "./ResumeReview";

interface ReviewResponse {
  message: string;
  resumeLength: number;
  feedback: string;
  data: string;
}

const Review = () => {
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState<ReviewResponse | null>(null);
  const [aiResponse, setAiResponse] = useState<ResumeAnalysisData | null>(null);

  const submitResume = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:5000/api/review`, {
        resumeText,
      });
      setResponse(res.data);
      setAiResponse(res.data.response);
      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setResumeText("");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex  justify-center bg-gray-100 p-6">
      <div className="w-[50%] mb-20">
        <Card className="w-full max-w-3xl">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-2xl font-bold flex justify-center">
              AI Resume Reviewer
            </h2>
            <Textarea
              placeholder="Paste Your resume text here..."
              name="resumeInput"
              value={resumeText}
              rows={7}
              onChange={(e) => setResumeText(e.target.value)}
            />
            <Button
              className="bg-gray-600 text-sm text-white flex justify-center items-center"
              onClick={submitResume}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </CardContent>
        </Card>
        <div>{aiResponse && <AiResponse data={aiResponse} />}</div>
      </div>

      {response && <ResponseCard response={response} />}
    </div>
  );
};

export default Review;
