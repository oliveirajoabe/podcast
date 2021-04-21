import Document, {Html, Head, Main, NextScript} from 'next/Document';

export default class MyDocument extends Document {
    render (){
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap" rel="stylesheet"/>
                </Head>
                <body>
                    <Main/> {/*onde esta a nossa aplicação*/}
                    <NextScript/> {/*sao os scripts que o next precisa implementar*/}
                </body>
            </Html>
        )
    }
}