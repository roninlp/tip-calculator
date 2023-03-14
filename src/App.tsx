import React, { useEffect, useState } from "react";

import logo from "./assets/logo.svg";
import dollorLogo from "./assets/icon-dollar.svg";
import personLogo from "./assets/icon-person.svg";

function App() {
  const [bill, setBill] = useState<number | undefined>();
  const [tip, setTip] = useState(0);
  const [customTip, setCustomTip] = useState<number | undefined>();
  const [peopleCount, setPeopleCount] = useState(1);

  const [tipAmount, setTipAmount] = useState(0);
  const [total, setTotal] = useState(0);

  const [showPeopleCountError, setShowPeopleCountError] = useState(false);
  const [activeTip, setActiveTip] = useState<number>();

  const calculateTip = () => {
    if (!tip || !bill) {
      return;
    }

    let currentTip: number;

    if (customTip) {
      currentTip = customTip;
    } else {
      currentTip = tip;
    }

    const totalTip = bill * (currentTip / 100);
    setTipAmount(totalTip / peopleCount);
    setTotal((bill + totalTip) / peopleCount);
  };

  useEffect(() => {
    calculateTip();
  }, [bill, tip, peopleCount, customTip]);

  const getTip = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setTip(parseFloat(e.currentTarget.value));
    setActiveTip(parseFloat(e.currentTarget.value));
  };

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-16 bg-lightGrayCyan">
      <header>
        <img src={logo} alt="splitter logo" />
      </header>
      <section className="flex w-full max-w-3xl gap-10 rounded-3xl bg-white p-8">
        <div className="flex flex-1 flex-col gap-8">
          <div>
            <label
              className="mb-2 block text-sm text-darkGrayCyan"
              htmlFor="bill"
            >
              Bill
            </label>
            <div className="relative">
              <input
                className="w-full rounded-md border-none bg-veryLightGrayCyan text-right text-veryDarkCyan focus:ring-2 focus:ring-primary"
                inputMode="decimal"
                type="number"
                id="bill"
                placeholder="0"
                value={bill}
                onChange={(e) => setBill(parseFloat(e.target.value))}
              />
              <img
                src={dollorLogo}
                className="absolute left-3 top-3"
                alt="bill"
              />
            </div>
          </div>
          <div>
            <label
              className="mb-2 block text-sm text-darkGrayCyan"
              htmlFor="bill"
            >
              Select Tip %
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                value={5}
                className={`h-full w-full rounded-md  py-2  hover:bg-primary hover:text-veryDarkCyan ${
                  activeTip == 5
                    ? "bg-primary text-veryDarkCyan"
                    : "bg-veryDarkCyan text-white"
                }`}
                onClick={getTip}
              >
                5%
              </button>
              <button
                value={10}
                className={`h-full w-full rounded-md py-2 hover:bg-primary hover:text-veryDarkCyan ${
                  activeTip == 10
                    ? "bg-primary text-veryDarkCyan"
                    : "bg-veryDarkCyan text-white"
                }`}
                onClick={getTip}
              >
                10%
              </button>
              <button
                value={15}
                className={`h-full w-full rounded-md py-2 hover:bg-primary hover:text-veryDarkCyan ${
                  activeTip == 15
                    ? "bg-primary text-veryDarkCyan"
                    : "bg-veryDarkCyan text-white"
                }`}
                onClick={getTip}
              >
                15%
              </button>
              <button
                value={25}
                className={`h-full w-full rounded-md py-2 hover:bg-primary hover:text-veryDarkCyan ${
                  activeTip == 25
                    ? "bg-primary text-veryDarkCyan"
                    : "bg-veryDarkCyan text-white"
                }`}
                onClick={getTip}
              >
                25%
              </button>
              <button
                value={50}
                className={`h-full w-full rounded-md py-2 hover:bg-primary hover:text-veryDarkCyan ${
                  activeTip == 50
                    ? "bg-primary text-veryDarkCyan"
                    : "bg-veryDarkCyan text-white"
                }`}
                onClick={getTip}
              >
                50%
              </button>

              <input
                className="h-full w-full rounded-md border-none bg-veryLightGrayCyan p-0 py-2 text-center text-veryDarkCyan focus:ring-2 focus:ring-primary"
                placeholder="Custom"
                type="number"
                onChange={(e) => {
                  if (!e.target.value) {
                    setCustomTip(undefined);
                  }
                  setCustomTip(parseFloat(e.target.value));
                }}
                value={customTip}
              />
            </div>
          </div>
          <div className="relative">
            <label
              className="mb-2 block text-sm text-darkGrayCyan"
              htmlFor="people"
            >
              Number of People
            </label>
            {showPeopleCountError ? (
              <p className="absolute top-0 right-0 text-red-600">
                Can't be zero
              </p>
            ) : null}
            <div className="relative">
              <input
                className="w-full rounded-md border-none bg-veryLightGrayCyan text-right text-veryDarkCyan focus:ring-2 focus:ring-primary"
                type="number"
                placeholder="1"
                inputMode="decimal"
                id="people"
                onChange={(e) => {
                  const currentValue = parseInt(e.target.value);
                  if (currentValue === 0) {
                    setShowPeopleCountError(true);
                    return;
                  }
                  setShowPeopleCountError(false);
                  setPeopleCount(currentValue);
                }}
                value={peopleCount}
              />
              <img
                src={personLogo}
                className="absolute left-3 top-3"
                alt="Number of people"
              />
            </div>
          </div>
        </div>
        <div className=" flex-1  rounded-xl bg-veryDarkCyan">
          <div className="flex h-full flex-col items-center justify-between p-8">
            <div className="w-full pt-2">
              <div className="mb-8 flex justify-between">
                <div>
                  <h4 className="text-white">Tip Amount</h4>
                  <p className="text-xs text-darkGrayCyan">/ person</p>
                </div>
                <h3 className="text-3xl text-primary">
                  ${tipAmount.toPrecision(3)}
                </h3>
              </div>
              <div className="flex w-full justify-between">
                <div>
                  <h4 className="text-white">Total</h4>
                  <p className="text-xs text-darkGrayCyan">/ person</p>
                </div>
                <h3 className="text-3xl text-primary">
                  ${total.toPrecision(3)}
                </h3>
              </div>
            </div>
            <button className="w-full rounded-md bg-lightGrayCyan py-2">
              RESET
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
