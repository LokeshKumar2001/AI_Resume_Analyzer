import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ResumeAnalysisData } from "./ResumeReview";

const priorityColor: Record<"High" | "Medium" | "Low", string> = {
  High: "bg-red-500",
  Medium: "bg-yellow-500",
  Low: "bg-green-500",
};

interface AiResponseProps {
  data?: ResumeAnalysisData;
}

const AiResponse = ({ data }: AiResponseProps) => {
  if (!data) return null;

  return (
    <div className="space-y-6 mt-8">
      {/* ATS SCORE */}
      <Card>
        <CardHeader>
          <CardTitle>ATS Score</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-4xl font-bold text-green-600">
            {data?.score_metrics?.ats_score}%
          </p>
          <p className="text-sm text-muted-foreground">
            {data?.score_metrics?.keyword_match}
          </p>
        </CardContent>
      </Card>

      {/* CRITICAL FIXES */}
      <Card>
        <CardHeader>
          <CardTitle>Critical Fixes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data?.critical_fixes?.map((fix, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{fix.type}</h4>
                <Badge className={priorityColor[fix.priority]}>
                  {fix.priority}
                </Badge>
              </div>

              <p className="text-sm text-gray-700">{fix.issue}</p>
              <p className="text-sm text-muted-foreground">{fix.description}</p>

              {index !== data?.critical_fixes?.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* KEYWORD ANALYSIS */}
      <Card>
        <CardHeader>
          <CardTitle>Keyword Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Found Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {data?.keyword_analysis?.found?.map((keyword, index) => (
                <Badge key={index} variant="secondary">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-2">Missing Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {data?.keyword_analysis?.missing?.map((keyword, index) => (
                <Badge key={index} variant="destructive">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FRESHER LOGIC */}
      <Card>
        <CardHeader>
          <CardTitle>Fresher Evaluation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold">Academic Strength</h4>
            <p className="text-sm text-muted-foreground">
              {data?.fresher_logic?.academic_strength}
            </p>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold">Project Strength</h4>
            <p className="text-sm text-muted-foreground">
              {data?.fresher_logic?.project_score}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AiResponse;
