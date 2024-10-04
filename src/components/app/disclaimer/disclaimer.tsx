import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Disclaimer() {
  return (
    <div className="container mx-auto py-10">
      <Card className="mx-auto w-full max-w-3xl border-[0px] sm:border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Disclaimer</CardTitle>
          <CardDescription>
            Please read this disclaimer carefully before using the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-sm text-muted-foreground">
            <p>
              This application is provided "as is" and is intended primarily for
              personal use by the developer and others who choose to use it at
              their own risk.
            </p>
            <p>
              By using this application, you acknowledge and agree to the
              following:
            </p>
            <ol className="list-inside list-decimal space-y-4">
              <li>
                The developer is not responsible for any loss of data that may
                occur while using this application.
              </li>
              <li>
                The developer does not guarantee the accuracy, completeness, or
                usefulness of the application or any information it provides.
              </li>
              <li>
                The developer is not liable for any damages or losses resulting
                from the use of this application, including but not limited to
                direct, indirect, incidental, punitive, and consequential
                damages.
              </li>
              <li>
                The application may contain bugs, errors, or other issues that
                could potentially cause problems on your device or with your
                data. Use it at your own risk.
              </li>
              <li>
                The developer reserves the right to modify, suspend, or
                discontinue the application at any time without notice.
              </li>
              <li>
                This disclaimer may be updated from time to time, and your
                continued use of the application constitutes acceptance of any
                changes.
              </li>
            </ol>
            <p>
              If you do not agree with these terms, please do not use the
              application. By using the application, you indicate that you have
              read, understood, and agreed to this disclaimer.
            </p>
            <p className="font-semibold">
              Use this application responsibly and at your own discretion.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
