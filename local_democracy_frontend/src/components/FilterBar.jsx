import {
  Input,
  Stack,
  Select,
  Portal,
  createListCollection,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";

const categoryOptions = createListCollection({
  items: [
    { label: "Environment", value: "Environment" },
    { label: "Infrastructure", value: "Infrastructure" },
    { label: "Education", value: "Education" },
  ],
});

const statusOptions = createListCollection({
  items: [
    { label: "Proposed", value: "Proposed" },
    { label: "Under Review", value: "Under Review" },
    { label: "Approved", value: "Approved" },
  ],
});

const FilterBar = ({ search_url, search_url_func, base_url }) => {
  const searchInputRef = useRef(null);
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')

  function categoryHandelChange(e) {
    setCategory(e.target.value)
  }
  function statusHandelChange(e) {
    setStatus(e.target.value)
  }

  let debuncingId;
  function searchHandelChange() {
    if (debuncingId) {
      clearTimeout(debuncingId);
    }

    debuncingId = setTimeout(() => {
      setSearch(searchInputRef.current.value)
    }, 1000)
  }


  useEffect(() => {
    search_url_func(`${base_url}?category=${category}&&status=${status}&&search=${search}`)
  }, [category, status, search])

  return (
    <Stack direction={{ base: "column", md: "row" }} spacing={4} mb={6}>
      <Input placeholder="Search proposals..." onChange={searchHandelChange} ref={searchInputRef} />

      {/* Category Filter */}
      <Select.Root collection={categoryOptions} size="sm" width="200px" onChange={categoryHandelChange}>
        <Select.HiddenSelect />
        <Select.Label>Filter by Category</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Filter by Category" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {categoryOptions.items.map((item) => (
                <Select.Item item={item} key={item.value}>
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>

      {/* Status Filter */}
      <Select.Root collection={statusOptions} size="sm" width="200px" onChange={statusHandelChange}>
        <Select.HiddenSelect />
        <Select.Label>Filter by Status</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Filter by Status" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {statusOptions.items.map((item) => (
                <Select.Item item={item} key={item.value}>
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Stack>
  );
};

export default FilterBar;
