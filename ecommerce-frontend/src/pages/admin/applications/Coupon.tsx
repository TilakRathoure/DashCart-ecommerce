import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import toast from "react-hot-toast";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

const Coupon = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [size, setSize] = useState<number>(8);
  const [prefix, setPrefix] = useState<string>("");
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const [coupon, setCoupon] = useState<string>("");

  const copyText = async (coupon: string) => {
    await window.navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user || user._id != "admin") return toast.error("need admin access");

    if (!includeNumbers && !includeCharacters && !includeSymbols)
      return alert("Please Select One At Least");

    let result: string = prefix;
    const loopLength: number = size - result.length;

    for (let i = 0; i < loopLength; i++) {
      let entireString: string = "";
      if (includeCharacters) entireString += allLetters;
      if (includeNumbers) entireString += allNumbers;
      if (includeSymbols) entireString += allSymbols;

      const randomNum: number = ~~(Math.random() * entireString.length);
      result += entireString[randomNum];
    }

    setCoupon(result);
  };

  useEffect(() => {
    setIsCopied(false);
  }, [coupon]);

  return (
    <div className="flex min-h-full flex-col items-center justify-center text-admin-text">
      <h1 className="mb-6 font-display text-3xl font-semibold tracking-tight">
        Coupon
      </h1>
      <section className="admin-card w-full max-w-lg p-8">
        <form className="grid grid-cols-2 gap-5" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Text to include"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            maxLength={size}
            className="admin-input"
          />

          <input
            type="number"
            placeholder="Coupon Length"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            min={8}
            max={25}
            className="admin-input"
          />

          <fieldset className="col-span-2 flex flex-wrap items-center justify-center gap-5 rounded-md border border-admin-line p-4">
            <legend className="px-2 text-sm text-admin-muted">Include</legend>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers((prev) => !prev)}
                className="accent-admin-accent"
              />
              <span>Numbers</span>
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={includeCharacters}
                onChange={() => setIncludeCharacters((prev) => !prev)}
                className="accent-admin-accent"
              />
              <span>Characters</span>
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols((prev) => !prev)}
                className="accent-admin-accent"
              />
              <span>Symbols</span>
            </label>
          </fieldset>

          <button type="submit" className="admin-btn col-span-2 py-3 text-base">
            Generate
          </button>
        </form>

        {coupon && (
          <code className="relative mt-5 block rounded-md border border-admin-line bg-admin-elevated px-4 py-3 text-center text-lg tracking-wide">
            {coupon}
            <button
              type="button"
              onClick={() => copyText(coupon)}
              className="absolute inset-0 flex items-center justify-center rounded-md bg-admin-bg/90 text-sm text-admin-accent opacity-0 transition hover:opacity-100"
            >
              {isCopied ? "Copied" : "Copy"}
            </button>
          </code>
        )}
      </section>
    </div>
  );
};

export default Coupon;
