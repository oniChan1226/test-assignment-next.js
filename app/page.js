'use client'
import Navbar, { Hero, AddCheckIn } from "./components";
import { useState } from "react";
import ListCheckIns from "./components/ListCheckIns";

export default function Home() {
  const [isAddModelOpen, setIsAddModelOpen] = useState(false);

  const handleAdd = () => {
    setIsAddModelOpen(prev => !prev);
  }



  return (
    <div className="relative">
      <AddCheckIn
        display={isAddModelOpen}
        onClose={handleAdd}
      />
      <Navbar />
      <Hero
        handleAdd={handleAdd}
      />
      <ListCheckIns />

    </div>
  );
}
