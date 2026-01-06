import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface ResponseCardProps {
  response: {
    message: string;
    resumeLength: number;
    feedback: string;
    data: string;
  };
}
const ResponseCard = ({ response }: ResponseCardProps) => {
  return (
    <Card className="flex-1 border shadow-sm">
      <CardHeader className="bg-gray-100">
        <CardTitle className="text-lg font-semibold">AI Review</CardTitle>
        <CardContent className="space-y-2 h-screen overflow-y-auto">
          <p>
            <span className="font-semibold">Message:</span>
            {response.message}
          </p>
          <p>
            <span className="font-semibold">Length:</span>
            {response.resumeLength}
          </p>
          <p>
            <span className="font-semibold">Feedback:</span>
            {response.feedback}
          </p>
          <div className="mt-2 p-2 bg-gray-50 rounded border">
            <pre className="whitespace-pre-wrap break-words text-sm">
              {response.data}
            </pre>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default ResponseCard;
