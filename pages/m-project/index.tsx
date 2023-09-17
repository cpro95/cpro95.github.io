import { useEffect } from 'react';

function RedirectPage() {
  useEffect(() => {
    // Perform the redirection when the component mounts
    window.location.href = 'http://132.226.227.91:3000';
  }, []);

  // This component doesn't render anything as it immediately redirects
  return null;
}

export default RedirectPage;