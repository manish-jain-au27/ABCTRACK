import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card"; // Assuming these are custom components
import { Collapsible, CollapsibleContent } from "./collapsible"; // Assuming these are custom components
import { Switch } from "./switch"; // Assuming this is a custom component
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { hslToHex } from "../../lib/utils"; // Replace with the actual path to hslToHex utility

const CardSnippet = ({ title, code, children }) => {
    const [show, setShow] = useState(false);
    const toggle = () => setShow((prevState) => !prevState);

    // Simulating theme logic (light/dark mode)
    const [mode, setMode] = useState("light"); // Default to light mode

    // Simulating theme data (normally you'd get this from a config or store)
    const theme = {
        light: {
            "secondary-foreground": "240, 100%, 50%", // Example HSL value for light theme
            secondary: "210, 100%, 40%", // Example HSL value for light theme
        },
        dark: {
            "secondary-foreground": "240, 50%, 50%", // Example HSL value for dark theme
            secondary: "210, 50%, 40%", // Example HSL value for dark theme
        },
    };

    // HSL to HEX conversion (simulate it with your utility)
    const hslPrimary = `hsla(${theme[mode]["secondary-foreground"]})`;
    const hslPrimary2 = `hsla(${theme[mode].secondary})`;

    const hexPrimary = hslToHex(hslPrimary);
    const hexPrimary2 = hslToHex(hslPrimary2);

    return (
        <Card className="bg-white">
            <CardHeader className="flex flex-row items-center">
                {title && <CardTitle className="flex-1 leading-normal">{title}</CardTitle>}
                {code && (
                    <div className="flex-none">
                        <Switch id="airplane-mode" onClick={toggle} />
                    </div>
                )}
            </CardHeader>
            <CardContent>
                {children}
                <Collapsible open={show}>
                    <CollapsibleContent>
                        <SyntaxHighlighter
                            language="javascript"
                            className="rounded-md text-sm mt-6"
                            style={atomOneDark}
                            customStyle={{
                                padding: "24px",
                                backgroundColor: mode !== "dark" ? hexPrimary : hexPrimary2,
                            }}
                        >
                            {code}
                        </SyntaxHighlighter>
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>
    );
};

export default CardSnippet;