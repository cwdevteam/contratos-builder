import * as React from "react";

interface EmailTemplateProps {
  songName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  songName,
}) => (
  <div>
    <h1>A contract has been created for the song: {songName}!</h1>
  </div>
);
