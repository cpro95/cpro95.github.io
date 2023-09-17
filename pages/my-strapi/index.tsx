import { useEffect } from 'react';

function RedirectPage() {
  useEffect(() => {
    // Perform the redirection when the component mounts
    window.location.href = 'http://193.122.110.76:1337/admin';
  }, []);

  // This component doesn't render anything as it immediately redirects
  return null;
}

export default RedirectPage;