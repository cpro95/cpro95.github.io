import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render () {
        return (
            
            <html>
                <Head>
                    <title>Cpro95's Github.io</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
                    {/* <style dangerouslySetInnerHTML={{ __html: bootstrap }} /> */}
                    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
                    <link href="/static/font-awesome.min.css" rel="stylesheet" />
                    <link href="/static/mystyle.css" rel="stylesheet" />
                    <link rel="stylesheet" href="/static/bootstrap.min.css" />
                    <script src="/static/jquery.min.js"></script>
                    <script src="/static/bootstrap.min.js"></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}
