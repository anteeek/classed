import React, { HTMLProps } from "react";
import classnames from "classnames";

type TClasserElProps<TagType, Additional> = HTMLProps<TagType> & Additional;

type ClassnamesResolver<TagType, Additional> =
  | TemplateStringsArray
  | string
  | ((
      elProps: TClasserElProps<TagType, Additional>
    ) => Parameters<typeof classnames>[0]);

function makeClasser<TagElementType>(Tag: string) {
  return function classer<CustomProps>(
    classnamesResolver: ClassnamesResolver<TagElementType, CustomProps>
  ) {
    return React.forwardRef<
      TagElementType,
      TClasserElProps<TagElementType, CustomProps>
    >((passedProps, ref) => {
      let resolvedClassname: string;

      if (typeof classnamesResolver === "function")
        resolvedClassname = classnames(classnamesResolver(passedProps));
      else if (typeof classnamesResolver === "string")
        resolvedClassname = classnamesResolver;
      else if (Array.isArray(classnamesResolver))
        resolvedClassname = classnames(...classnamesResolver);
      else resolvedClassname = "";

      return (
        <Tag
          {...{
            ...passedProps,
            className: classnames(passedProps.className, resolvedClassname),
          }}
          ref={ref}
        />
      );
    });
  };
}

const containerClassers = {
  div: makeClasser<HTMLDivElement>("div"),
  article: makeClasser<HTMLDivElement>("article"),
  section: makeClasser<HTMLDivElement>("section"),
  span: makeClasser<HTMLSpanElement>("span"),
  blockquote: makeClasser<HTMLQuoteElement>("blockquote"),
  summary: makeClasser<HTMLSpanElement>("summary"),
  pre: makeClasser<HTMLPreElement>("pre"),

  table: makeClasser<HTMLTableElement>("table"),
  tbody: makeClasser<HTMLTableSectionElement>("tbody"),
  td: makeClasser<HTMLTableDataCellElement>("td"),
  th: makeClasser<HTMLHeadElement>("th"),
  tfoot: makeClasser<HTMLTableSectionElement>("tfoot"),
};

const miscClassers = {
  image: makeClasser<HTMLImageElement>("image"),
  img: makeClasser<HTMLImageElement>("img"),
  video: makeClasser<HTMLVideoElement>("video"),

  a: makeClasser<HTMLLinkElement>("a"),

  b: makeClasser<HTMLSpanElement>("b"),
  i: makeClasser<HTMLSpanElement>("i"),

  svg: makeClasser<SVGElement>("svg"),

  strong: makeClasser<HTMLSpanElement>("strong"),
  li: makeClasser<HTMLLIElement>("li"),
  ul: makeClasser<HTMLUListElement>("ul"),
  ol: makeClasser<HTMLOListElement>("ol"),
  em: makeClasser<HTMLSpanElement>("em"),

  form: makeClasser<HTMLFormElement>("form"),
  textarea: makeClasser<HTMLTextAreaElement>("textarea"),
  input: makeClasser<HTMLInputElement>("input"),
  button: makeClasser<HTMLButtonElement>("button"),
  label: makeClasser<HTMLLabelElement>("label"),
  select: makeClasser<HTMLSelectElement>("select"),

  progress: makeClasser<HTMLProgressElement>("progress"),
  noscript: makeClasser<HTMLElement>("noscript"),
};

const headingClassers = {
  h1: makeClasser<HTMLHeadingElement>("h1"),
  h2: makeClasser<HTMLHeadingElement>("h2"),
  h3: makeClasser<HTMLHeadingElement>("h3"),
  h4: makeClasser<HTMLHeadingElement>("h4"),
  h5: makeClasser<HTMLHeadingElement>("h5"),
};

const classed = {
  ...containerClassers,
  ...miscClassers,
  ...headingClassers,
};

export default classed;
