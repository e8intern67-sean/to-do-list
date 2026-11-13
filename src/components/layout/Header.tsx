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
        <div aria-label="Daymark workspace" className="avatar">D</div>
      </div>
    </header>
  )
}

export default Header
