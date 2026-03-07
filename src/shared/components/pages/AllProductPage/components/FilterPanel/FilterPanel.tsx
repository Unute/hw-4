import s from "./FilterPanel.module.scss";
import Button from "@UI/Button";
import Input from "@UI/Input";
import MultiDropdown from "@UI/MultiDropdown";
import Text from "@UI/Text";
import { useProductListStore } from "../../context";
import { observer } from "mobx-react-lite";

type FilterPanelProps = {
  total?: number;
};

const FilterPanel = observer(({ total }: FilterPanelProps) => {
  const productListStore = useProductListStore();
  return (
    <div className={s.FilterPanel}>
      <div className={s.search}>
        <Input
          className={s.input}
          value={productListStore.searchQuery}
          onChange={productListStore.setSearch}
          placeholder="Search product"
        />
        <Button className={s.button} onClick={() => productListStore.submitSearch()}>Find now</Button>
      </div>
      <MultiDropdown
        options={productListStore.categories}
        value={productListStore.selectedCategories}
        onChange={productListStore.setCategories}
        getTitle={(selected) =>
          selected.length === 0
            ? "Filter"
            : selected.map((o) => o.value).join(", ")
        }
        className={s.dropdown}
      />
      <div className={s.text}>
        <Text className={s.totalProducts}>Total products</Text>
        <Text color="accent" className={s.total}>
          {total ?? "—"}
        </Text>
      </div>
    </div>
  );
});

export default FilterPanel;
