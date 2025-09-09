import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp, Loader2 } from "lucide-react";

export default function AdminImportPage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Import Questions</CardTitle>
          <CardDescription>
            Upload a CSV file containing questions to import
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <FileUp className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4 flex justify-center text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none hover:text-indigo-500"
                >
                  <span>Upload a CSV file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept=".csv"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                CSV up to 10MB with columns: level_code, theme_code, prompt, choiceA, choiceB, choiceC, choiceD, correct_index, explanation
              </p>
            </div>

            {/* Preview Table - Will be shown after file upload */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Preview (First 20 Rows)</h3>
              <div className="rounded-md border">
                <div className="min-h-[200px] flex items-center justify-center text-gray-500">
                  No file selected
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Import Questions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
