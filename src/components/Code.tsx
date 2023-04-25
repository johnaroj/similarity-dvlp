
"use client"
import React, { useEffect, useState } from 'react'
import { Language, defaultProps } from 'prism-react-renderer'
import darkTheme from "prism-react-renderer/themes/nightOwl"
import lightTheme from "prism-react-renderer/themes/nightOwlLight"
import { useTheme } from 'next-themes'
import Highlight from 'prism-react-renderer'

type Props = {
    code: string
    show: boolean
    language: Language
    animationDelay?: number
    animated?: boolean
}

const Code = ({ code, show, language, animationDelay, animated }: Props) => {
    const { theme: applicationTheme } = useTheme()
    const [text, setText] = useState(animated ? '' : code)
    useEffect(() => {
        if (show && animated) {
            let i = 0
            setTimeout(() => {
                const intervalId = setInterval(() => {
                    setText(code.slice(0, i));
                    i++
                    if (i > code.length) {
                        clearInterval(intervalId)
                    }
                }, 15)
                return () => clearInterval(intervalId)
            }, animationDelay || 150)
        }
    }, [code, show, animated, animationDelay])
    const lines = text.split(/\r\n|\f|\n/).length;
    const theme = applicationTheme === "light" ? lightTheme : darkTheme
    return (
        <Highlight {...defaultProps} code={text} language={language} theme={theme}>
            {({ className, tokens, getLineProps, getTokenProps }) => <pre
                className={className + 'transition-all w-fit bg-transparent duration-100 py-0 no-scrollbar'}
                style={{
                    maxHeight: show ? lines * 24 : 0,
                    opacity: show ? 1 : 0
                }}
            >{tokens.map((line, i) => {
                //esling-disable-next-line no-unused-vars
                const { key, ...rest } = getLineProps({ line, key: i })
                return (
                    <div key={`line-${i}`} style={{ position: 'relative' }} {...rest}>{line.map((token, index) => {
                        //esling-disable-next-line no-unused-vars
                        const { key, ...props } = getTokenProps({ token, i })
                        return <span key={index} {...props}></span>
                    })}</div>
                )
            })}</pre>}
        </Highlight>
    )
}

export default Code