import * as React from "react";
const BlogIcon = (props) => {

    if (props.selected) {
        return (
            <svg
                aria-label="New message"
                className="x1lliihq x1n2onr6 x5n08af"
                fill="currentColor"
                height={24}
                role="img"
                viewBox="0 0 24 24"
                width={24}
                {...props}
            >
                <title>{"New message"}</title>
                <path
                    d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                />
                <path
                    d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                />
                <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    x1={16.848}
                    x2={20.076}
                    y1={3.924}
                    y2={7.153}
                />
            </svg>
        );
    }

    return (
    <svg
        aria-label="New message"
        className="x1lliihq x1n2onr6 x5n08af"
        fill="currentColor"
        height={24}
        role="img"
        viewBox="0 0 24 24"
        width={24}
        {...props}
    >
        <title>{"New message"}</title>
        <path
        d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        />
        <path
        d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        />
        <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        x1={16.848}
        x2={20.076}
        y1={3.924}
        y2={7.153}
        />
    </svg>
    );
}


export default BlogIcon;