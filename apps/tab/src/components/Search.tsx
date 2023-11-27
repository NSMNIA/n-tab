import { useState } from 'react';
import { Input } from './ui/input';

const Search = () => {
  const [search, setSearch] = useState<string>('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.length === 0) {
      return;
    }
    const urlRegex = new RegExp('^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$');
    if (urlRegex.test(search)) {
      window.location.href = `${search.indexOf('http') === -1 ? 'https://' : ''}${search}`;
    } else {
      const urlParams = new URLSearchParams();
      urlParams.append('q', search);
      window.location.href = `https://www.google.com/search?${urlParams.toString()}`;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="search" autoFocus placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
    </form>
  );
};

export default Search;
