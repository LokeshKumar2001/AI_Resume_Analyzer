import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import ResponseCard from "./ResponseCard";

const Review = () => {
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);

  const submitResume = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:5000/api/review`, {
        resumeText,
      });
      setResponse(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
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

          {/*response && (
            <pre className="bg-black text-green-400 p-4 rounded-md text-sm overflow-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          )*/}
        </CardContent>
      </Card>
      {response && <ResponseCard response={response} />}
    </div>
  );
};

export default Review;
