type HeaderProps = {
  search: string
  onSearchChange: (value: string) => void
}

function Header({ search, onSearchChange }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__breadcrumb">
        <span>My workspace</span>
        <span aria-hidden="true">/</span>
        <strong>Tasks</strong>
      </div>
      <div className="header__actions">
        <label className="search-field">
          <span aria-hidden="true" className="search-field__icon">⌕</span>
          <span className="sr-only">Search tasks</span>
          <input
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search tasks..."
            type="search"
            value={search}
          />
        </label>
        <button aria-label="Notifications" className="header__notification" type="button">♧</button>
        <button aria-label="Open profile menu" className="profile-button" type="button">
          <span className="avatar">D</span>
          <span aria-hidden="true" className="profile-button__chevron">⌄</span>
        </button>
      </div>
    </header>
  )
}

export default Header
