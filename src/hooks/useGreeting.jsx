import{ useEffect, useState } from 'react'

const useGreeting = () => {
  const [greeting, setGreeting] = useState("")

  const updateGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  };

  // useEffect to update the greeting on component mount
  useEffect(() => {
    updateGreeting();
  }, []);

  return {greeting}
}

export default useGreeting