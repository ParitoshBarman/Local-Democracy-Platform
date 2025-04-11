"use client";

import {
  Input,
  Stack,
  Select,
  Portal,
  createListCollection,
} from "@chakra-ui/react";

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

const FilterBar = () => {
  return (
    <Stack direction={{ base: "column", md: "row" }} spacing={4} mb={6}>
      <Input placeholder="Search proposals..." />

      {/* Category Filter */}
      <Select.Root collection={categoryOptions} size="sm" width="200px">
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
      <Select.Root collection={statusOptions} size="sm" width="200px">
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
