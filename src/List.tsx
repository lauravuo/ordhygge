import type { Component } from "solid-js";

import model from "./Words";
import Dropdown from "./Dropdown";

const List: Component = () => {
  return (
    <div>
      <div class="bg-gray-50 min-h-screen">
        <div>
          <div class="p-4">
            <div class="bg-white p-4 rounded-md">
              <div>
                <div class="flex justify-between">
                  <h2 class="mb-4 text-xl font-bold text-gray-700">Ordhygge</h2>
                  <Dropdown
                    index="0"
                    options={[
                      { name: "🇫🇮", value: "fi" },
                      { name: "🇸🇪", value: "se" }
                    ]}
                  />
                </div>
                <div>
                  {Object.keys(model).map((item) => (
                    <div class="py-2">
                      <div class="flex justify-between bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-2 text-white font-bold text-md">
                        {item}
                      </div>
                      {Object.keys(model[item]).map((word) => (
                        <div class="flex border-b font-normal p-2 mt-4 space-x-4">
                          <div class="w-1/2">{word}</div>
                          <div class="w-1/2">{model[item][word].fi}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
