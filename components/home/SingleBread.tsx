import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

function SingleBread({ name }: { name: string }) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center justify-start" dir="">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">خانه</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="rotate-180" />
        <BreadcrumbItem>{name}</BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default SingleBread;
