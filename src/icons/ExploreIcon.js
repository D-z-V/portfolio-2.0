const ExploreIcon = (props) => {

    if (props.selected) {
      return (
  <svg
    aria-label="Explore"
    className="x1lliihq x1n2onr6 x5n08af"
    fill="currentColor"
    height={24}
    role="img"
    viewBox="0 0 24 24"
    width={24}
    {...props}
  >
    <title>{"Explore"}</title>
    <path d="m13.173 13.164 1.491-3.829-3.83 1.49ZM12.001.5a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12.001.5Zm5.35 7.443-2.478 6.369a1 1 0 0 1-.57.569l-6.36 2.47a1 1 0 0 1-1.294-1.294l2.48-6.369a1 1 0 0 1 .57-.569l6.359-2.47a1 1 0 0 1 1.294 1.294Z" />
  </svg>
        )
    }
  
    return (
      <svg
        aria-label="Explore"
        className="x1lliihq x1n2onr6 x5n08af"
        fill="currentColor"
        height={24}
        role="img"
        viewBox="0 0 24 24"
        width={24}
        {...props}
      >
        <title>{"Explore"}</title>
        <polygon
          fill="none"
          points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
        <polygon
          fillRule="evenodd"
          points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"
        />
        <circle
          cx={12.001}
          cy={12.005}
          fill="none"
          r={10.5}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    );
  }
  export default ExploreIcon;