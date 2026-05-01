import { useState, useEffect } from 'react';

const BIRTHDAY = new Date(2006, 1, 28); // February 28, 2006

function getAge(): number {
  const now = new Date();
  let age = now.getFullYear() - BIRTHDAY.getFullYear();
  const monthDiff = now.getMonth() - BIRTHDAY.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < BIRTHDAY.getDate())) {
    age--;
  }
  return age;
}

function getNextBirthday(): Date {
  const now = new Date();
  const thisYear = now.getFullYear();
  const birthdayThisYear = new Date(thisYear, BIRTHDAY.getMonth(), BIRTHDAY.getDate());
  if (now >= birthdayThisYear) {
    return new Date(thisYear + 1, BIRTHDAY.getMonth(), BIRTHDAY.getDate());
  }
  return birthdayThisYear;
}

function getCountdown(): { days: number; hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const next = getNextBirthday();
  const diff = next.getTime() - now.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export const useAge = () => {
  const [age, setAge] = useState(getAge());
  const [countdown, setCountdown] = useState(getCountdown());

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(getAge());
      setCountdown(getCountdown());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return { age, countdown };
};
