
const ProjectIcon = (props) => {

    if (props.selected) {
      return (
        <svg
        aria-label="Reels"
        className="x1lliihq x1n2onr6 x5n08af"
        fill="currentColor"
        height={24}
        role="img"
        viewBox="0 0 24 24"
        width={24}
        {...props}
      >
        <title>{"Reels"}</title>
        <path
          d="m12.823 1 2.974 5.002h-5.58l-2.65-4.971c.206-.013.419-.022.642-.027L8.55 1Zm2.327 0h.298c3.06 0 4.468.754 5.64 1.887a6.007 6.007 0 0 1 1.596 2.82l.07.295h-4.629L15.15 1Zm-9.667.377L7.95 6.002H1.244a6.01 6.01 0 0 1 3.942-4.53Zm9.735 12.834-4.545-2.624a.909.909 0 0 0-1.356.668l-.008.12v5.248a.91.91 0 0 0 1.255.84l.109-.053 4.545-2.624a.909.909 0 0 0 .1-1.507l-.1-.068-4.545-2.624Zm-14.2-6.209h21.964l.015.36.003.189v6.899c0 3.061-.755 4.469-1.888 5.64-1.151 1.114-2.5 1.856-5.33 1.909l-.334.003H8.551c-3.06 0-4.467-.755-5.64-1.889-1.114-1.15-1.854-2.498-1.908-5.33L1 15.45V8.551l.003-.189Z"
          fillRule="evenodd"
        />
      </svg>
      );
  
    }
  
    return (
      <svg
      aria-label="Reels"
      className="x1lliihq x1n2onr6 x5n08af"
      fill="currentColor"
      height={24}
      role="img"
      viewBox="0 0 24 24"
      width={24}
      {...props}
    >
      <title>{"Reels"}</title>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={2}
        x1={2.049}
        x2={21.95}
        y1={7.002}
        y2={7.002}
      />
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        x1={13.504}
        x2={16.362}
        y1={2.001}
        y2={7.002}
      />
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        x1={7.207}
        x2={10.002}
        y1={2.11}
        y2={7.002}
      />
      <path
        d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z"
        fillRule="evenodd"
      />
    </svg>
  );
  }
  export default ProjectIcon;
  