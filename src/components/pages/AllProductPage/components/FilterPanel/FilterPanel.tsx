import Input from "@/components/UI/Input"
import Button from "@/components/UI/Button"
import s from './FilterPanel.module.scss'
// import MultiDropdown from "@/components/UI/MultiDropdown"
import Text from "@/components/UI/Text"

type FilterPanelProps = {
  total?: number;
};

const FilterPanel = ({ total }: FilterPanelProps) => {
  return (
    <div className={s.FilterPanel}>
      <div className={s.search}>
        <Input className={s.input} value="Search product" onChange={() => { }} />
        <Button children='Search' />
      </div>

      {/* <MultiDropdown /> */}
      <div className={s.text}>
        <Text className={s.totalProducts} children="Total products" />
        <Text color={"accent"} className={s.total} children={total ?? '—'} />
      </div>
    </div>
  )
}

export default FilterPanel