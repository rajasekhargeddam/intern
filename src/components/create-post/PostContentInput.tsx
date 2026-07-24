type PostContentInputProps = {
  content: string;
  onChange: (value: string) => void;
};

function PostContentInput({ content, onChange }: PostContentInputProps) {
  return (
    <textarea
      rows={5}
      className="w-full rounded-3xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
      placeholder="Write something..."
      value={content}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default PostContentInput;
