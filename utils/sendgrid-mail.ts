// send mail using sendgrid api
const sendGridMail = async ({
  from,
  to,
  subject,
  template_id,
  dynamic_template_data,
}: {
  from: string;
  to: string;
  subject: string;
  template_id: string;
  dynamic_template_data: {};
}) => {
  const email = await fetch('https://api.sendgrid.com/v3/mail/send', {
    body: JSON.stringify({
      from: {
        email: from, // add your email here
      },
      personalizations: [
        {
          to: [
            {
              email: to,
            },
          ],
          dynamic_template_data, // dynamic variables value for SendGrid Template
        },
      ],
      subject,
      template_id, // add template ID here,
      // templates can be created inside SendGrid and can use variables
    }),
    headers: {
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
  return email
}

export default sendGridMail
