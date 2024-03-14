import { FileTextIcon, PlusIcon } from "@radix-ui/react-icons";

import Breadcrumbs from "@/components/breadcrumbs";
import H1 from "@/components/h1";
import Button from "@/components/button";

export default function PageHeader({ text }: { text: string }) {
  return (
    <div className="flex py-5 justify-between items-center px-4 md:px-0">
      <div>
        <Breadcrumbs />
        <H1 className="mt-4 flex items-center text-gray-700 font-light">
          <FileTextIcon className="inline-block w-10 h-10 md:w-14 md:h-14 mr-3 md:mr-6" />
          {text}
        </H1>
      </div>
      <div>
        <Button>
          <PlusIcon className="mr-2" /> Add New
        </Button>
      </div>
    </div>
  );
}
