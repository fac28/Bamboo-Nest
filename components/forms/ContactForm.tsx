import { tailwindForInputs } from "@/utils/constants";

export default function ContactForm({submit}:{submit: (formData: FormData) => void}) {
    return (<form className="grid grid-cols-1 gap-2 ">
      <label htmlFor="contact-email">Email</label>
      <input placeholder="example@example.com" className={tailwindForInputs} type="email" name="contact-email" id="contact-email" required />
      <label htmlFor="contact-message">Message</label>
      <textarea placeholder="How can we help?" className={`rounded-xl min-h-[150px] ${tailwindForInputs}`} name="contact-message" id="contact-message" />
      <button type="submit" formAction={submit} className="bg-foundation text-white px-4 py-2 border border-foundation rounded-full hover:opacity-80">
        Submit
      </button>
    </form>);
  }