import { FormEvent, useEffect, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import toast from "react-hot-toast";


const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

const Coupon = () => {

  const {user}=useSelector((state:RootState)=>state.userReducer);

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

    if(!user || user._id!="admin") return toast.error("need admin access");

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
    <div className="admin-container flex h-screen backgco text-gray-100">

        <AdminSidebar />

      <main className="flex-1 p-8 w-3/4 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-6">Coupon</h1>
        <section>
          <form className="grid grid-cols-2 gap-8 max-w-lg" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Text to include"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              maxLength={size}
              className="text-black p-4 border border-gray-300 rounded"
            />

            <input
              type="number"
              placeholder="Coupon Length"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              min={8}
              max={25}
              className="text-black p-4 border border-gray-300 rounded"
            />

            <fieldset className="flex items-center justify-center gap-4 p-4 border border-gray-300 rounded col-span-2">
              <legend className="sr-only">Include</legend>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={() => setIncludeNumbers((prev) => !prev)}
                  className="mr-2"
                />
                <span>Numbers</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeCharacters}
                  onChange={() => setIncludeCharacters((prev) => !prev)}
                  className="mr-2"
                />
                <span>Characters</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={() => setIncludeSymbols((prev) => !prev)}
                  className="mr-2"
                />
                <span>Symbols</span>
              </label>
            </fieldset>
            <button type="submit" className="font-bold text-xl py-4 bg-blue-600 text-white rounded col-span-2">
              Generate
            </button>
          </form>

          {coupon && (
            <code className="relative text-xl mt-4 inline-block">
              {coupon}{" "}
              <span
                onClick={() => copyText(coupon)}
                className="cursor-pointer ml-2 text-sm bg-gray-900 text-white px-2 py-1 rounded opacity-0 hover:opacity-100 absolute top-0 left-0 w-full flex items-center justify-center"
              >
                {isCopied ? "Copied" : "Copy"}
              </span>
            </code>
          )}
        </section>
      </main>
    </div>
  );
};

export default Coupon;
