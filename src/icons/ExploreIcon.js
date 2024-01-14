const ExploreIcon = (props) => {

    if (props.selected) {
      return (
          <svg
        aria-label="Messenger"
        className="x1lliihq x1n2onr6 x5n08af"
        fill="currentColor"
        height={24}
        role="img"
        viewBox="0 0 24 24"
        width={24}
        {...props}
      >
        <title>{"Messenger"}</title>
        <path d="M12.003 1.131a10.487 10.487 0 0 0-10.87 10.57 10.194 10.194 0 0 0 3.412 7.771l.054 1.78a1.67 1.67 0 0 0 2.342 1.476l1.935-.872a11.767 11.767 0 0 0 3.127.416 10.488 10.488 0 0 0 10.87-10.57 10.487 10.487 0 0 0-10.87-10.57Zm5.786 9.001-2.566 3.983a1.577 1.577 0 0 1-2.278.42l-2.452-1.84a.63.63 0 0 0-.759.002l-2.556 2.049a.659.659 0 0 1-.96-.874L8.783 9.89a1.576 1.576 0 0 1 2.277-.42l2.453 1.84a.63.63 0 0 0 .758-.003l2.556-2.05a.659.659 0 0 1 .961.874Z" />
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