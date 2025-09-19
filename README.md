# Telbiz TS SDK

[![npm version](https://img.shields.io/npm/v/telbiz_ts.svg)](https://www.npmjs.com/package/telbiz_ts)
[![npm downloads](https://img.shields.io/npm/dm/telbiz_ts.svg)](https://www.npmjs.com/package/telbiz_ts)
[![license](https://img.shields.io/npm/l/telbiz_ts.svg)](LICENSE)
[![typescript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

> 🛠️ **TypeScript-ready SDK for Telbiz API**
> This package (`telbiz_ts`) is a modern reimplementation of the original [telbiz](https://www.npmjs.com/package/telbiz) package, with full TypeScript support and typings.
>
> Supports **SMS sending** and **mobile top-up** via Telbiz API.

---

## 📦 Installation

```bash
npm install telbiz_ts
```

or

```bash
yarn add telbiz_ts
```

---

## 🚀 Usage

### TypeScript / ES Module

```ts
import { Telbiz } from "telbiz_ts";

const tb = new Telbiz("XXXXX253832870000", "b266ef94-bb18-4ff2-8f38-e358f130XXXX");

(async () => {
  try {
    const sms = await tb.SendSMSAsync(tb.SMSHeader.OTP, "209961XXXX", "Hello OTP");
    console.log("SMS:", sms);

    const topup = await tb.SendTopupAsync("205504XXXX", 10000);
    console.log("Topup:", topup);
  } catch (err) {
    console.error("Error:", err);
  }
})();
```

### CommonJS

```js
const { Telbiz } = require("telbiz_ts");

const tb = new Telbiz("XXXXX253832870000", "b266ef94-bb18-4ff2-8f38-e358f130XXXX");

tb.SendSMSAsync(tb.SMSHeader.Default, "209961XXXX", "Hi ... 1")
  .then((rs) => console.log("SMS:", rs))
  .catch((err) => console.error("Error: ", err));

tb.SendTopupAsync("205504XXXX", 10000)
  .then((rs) => console.log("Topup:", rs))
  .catch((err) => console.error("Error: ", err));
```

---

## 📖 API Reference

### `new Telbiz(ClientID: string, Secret: string)`

Initialize a new Telbiz client.

### `tb.SMSHeader`

Available headers:

* `Default`
* `News`
* `Promotion`
* `OTP`
* `Info`
* `Unknown`

### `tb.SendSMSAsync(header: string, phone: string, message: string): Promise<any>`

Send an SMS.

* `header` → One of `tb.SMSHeader.*`
* `phone` → Must start with `20` or `30`
* `message` → Message text

### `tb.SendTopupAsync(phone: string, amount: number): Promise<any>`

Send a mobile top-up.

* `phone` → Must start with `20` or `30`
* `amount` → Must be **at least 5000**

---

## ⚠️ Notes

* Phone number must start with `20` or `30`
* Phone number length must not exceed 10 digits
* Topup amount must be at least `5000`
* Requires valid Telbiz **ClientID** & **Secret**

---

## 📜 Related

* [telbiz (JavaScript only)](https://www.npmjs.com/package/telbiz) — Original package
* **telbiz\_ts** — TypeScript-ready version (this package)

## 🔗 Links
- 📦 [NPM Package](https://www.npmjs.com/package/telbiz_ts)
- 💻 [GitHub Repository](https://github.com/seng-dev/telbiz_ts)

---

## 🛡 License

MIT © \[SENG DEV]
