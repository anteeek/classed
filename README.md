# Claser

This package aims to provide the flexibility of twin.macro with no magic behind.
The only thing it does is adding a set of classnames to a React Element using a familiar, styled-components-like API:

```
    import React from "react";
    import classed from "@antek/classed";
    
    const MySection = classed.section(`class1 class2`);

    [...]

    <MySection className="class3" aria-hidden="false">
        I like cheese
    </MySection>

    /*
        The above jsx outputs:

        <section class="class1 class2 class3" aria-hidden="false">
            I like cheese
        </section>
    */
```

It aims to mimic original typescript typings from corresponding underlying React Elements.