import { useState } from "react";
import { useFeedbackStore } from "@/modules/annotator/stores/feedback";
import { RadioGroup, RadioGroupItem } from "@/components/primitives/radioGroup";

const Tags = () => {
  const {
    tags,
    tag: selectedTag,
    setTag,
    addTag,
    deleteTag,
  } = useFeedbackStore();

  const [label, setLabel] = useState(null);
  const [instruction, setInstruction] = useState(null);
  const [showAddTagInputs, toggleAddTagInputs] = useState(false);

  const _handleTagChange = (tagLabel) => {
    setTag(tagLabel);
  };

  const _handleAdd = (e) => {
    addTag({
      label,
      instruction,
      color: `#08f`,
    });
    toggleAddTagInputs(false);
  };

  return (
    <div className="mb-2 flex w-full flex-col border-t border-gray-100 px-2 dark:border-gray-900">
      <div className="ml-2 mt-4 flex flex-row text-xs">
        <label className="mr-1 text-slate-300 underline decoration-dashed dark:text-slate-500">
          Feedback Tags
        </label>
      </div>
      <RadioGroup
        defaultValue={selectedTag?.label}
        value={selectedTag?.label}
        onValueChange={_handleTagChange}
        className="flex w-full flex-row flex-wrap"
      >
        {tags.map((_tag, idx) => (
          <div className="flex w-[22%] flex-row px-2 py-2">
            <RadioGroupItem
              className="mt-1"
              value={_tag?.label}
              id={_tag?.label}
            />
            <div className="relative ml-1 flex w-full flex-col">
              <div className="align-center flex flex-row items-center justify-start">
                <label
                  htmlFor={_tag?.label}
                  className={`mr-2 underline decoration-8`}
                  style={{ textDecorationColor: _tag?.color }}
                >
                  {_tag?.label}
                </label>
                <button
                  onClick={(e) => {
                    deleteTag(idx);
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 0.48 0.48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.14 0.08A0.04 0.04 0 0 1 0.18 0.04h0.12a0.04 0.04 0 0 1 0.04 0.04v0.04h0.08a0.02 0.02 0 1 1 0 0.04H0.399L0.381 0.403a0.04 0.04 0 0 1 -0.04 0.037H0.139a0.04 0.04 0 0 1 -0.04 -0.037L0.081 0.16H0.06a0.02 0.02 0 0 1 0 -0.04h0.08V0.08zm0.04 0.04h0.12V0.08H0.18v0.04zM0.121 0.16 0.139 0.4h0.203L0.359 0.16H0.121zM0.2 0.2a0.02 0.02 0 0 1 0.02 0.02v0.12a0.02 0.02 0 1 1 -0.04 0V0.22A0.02 0.02 0 0 1 0.2 0.2zm0.08 0a0.02 0.02 0 0 1 0.02 0.02v0.12a0.02 0.02 0 1 1 -0.04 0V0.22A0.02 0.02 0 0 1 0.28 0.2z"
                      className="fill-black dark:fill-white"
                    />
                  </svg>
                </button>
              </div>
              {/* <div className="absolute bottom-0 left-0 h-4 w-full"></div> */}
              <label className="relative mt-2 w-full text-xs text-slate-500">
                {_tag?.instruction}
              </label>
            </div>
          </div>
        ))}
      </RadioGroup>
      <div className="flex flex-col">
        {showAddTagInputs ? (
          <>
            <div className="ml-2 mt-4 flex flex-row text-xs">
              <label className="mr-1 text-slate-300 underline decoration-dashed dark:text-slate-500">
                Add new selectedTag
              </label>
              <label className="underline"></label>
            </div>
            <div className="align-end my-4 ml-2 flex flex-row items-end text-xs ">
              <div className="mr-4 flex flex-col">
                <label>Label</label>
                <input
                  className="mt-1 h-[32px] w-[250px] border border-gray-200 py-2 px-2"
                  type="text"
                  onChange={(e) => {
                    setLabel(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label>Instruction</label>
                <input
                  className="selection-none mt-1 h-[32px] w-[250px] border border-gray-200 py-2 px-2"
                  type="text"
                  onChange={(e) => {
                    setInstruction(e.target.value);
                  }}
                />
              </div>
              <button
                className="ml-2 h-[32px] rounded-sm border border-gray-200 px-2 py-1"
                onClick={_handleAdd}
              >
                Add
              </button>
              <button
                className="ml-2 h-[32px] rounded-sm border border-gray-200 px-2 py-1"
                onClick={(e) => {
                  toggleAddTagInputs(false);
                }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="flex w-[22%] flex-row px-2 py-2">
            <div className="relative ml-1 flex w-fit flex-col text-sm">
              <button
                className="rounded-sm border border-gray-200 px-2 py-1"
                onClick={(e) => {
                  toggleAddTagInputs(true);
                }}
              >
                Add New Tag
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tags;
