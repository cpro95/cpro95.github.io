import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render () {
        return (
            <html>
                <Head>
                    <title>My page</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    {/* <style dangerouslySetInnerHTML={{ __html: bootstrap }} /> */}
                    <link rel="stylesheet" href="/static/bootstrap.min.css"/>
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
