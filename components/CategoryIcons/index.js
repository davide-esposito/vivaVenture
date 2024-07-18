import styled from "styled-components";
import { Icon } from "@/components/Icon";

const categories = [
  { name: "Ball Sports", icon: "ballSports" },
  { name: "Cycling", icon: "cycling" },
  { name: "Gymnastics", icon: "gymnastics" },
  { name: "Hiking", icon: "hiking" },
  { name: "Kayaking", icon: "kayaking" },
  { name: "Running", icon: "running" },
  { name: "Sailing", icon: "sailing" },
  { name: "Snow Sports", icon: "snowSports" },
  { name: "Surfing", icon: "surfing" },
  { name: "Swimming", icon: "swimming" },
];

export default function CategoryIcons({ onSelect, selectedCategory }) {
  return (
    <IconContainer>
      {categories.map((category, index) => (
        <IconWrapper
          key={index}
          onClick={() => onSelect(category.name)}
          isActive={selectedCategory === category.name}
        >
          <Icon name={category.icon} />
          <IconLabel>{category.name}</IconLabel>
          <Underline
            className="underline"
            isActive={selectedCategory === category.name}
          />
        </IconWrapper>
      ))}
    </IconContainer>
  );
}

const IconContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.5rem 0;
  justify-content: center;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 50px;
  cursor: pointer;
  position: relative;
  color: ${({ isActive }) => (isActive ? "var(--teal)" : "var(--text-color)")};

  &:hover {
    color: var(--teal);
    .underline {
      transform: scaleX(1);
    }
  }
`;

const IconLabel = styled.span`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  text-align: center;
`;

const Underline = styled.div`
  width: 100%;
  height: 2px;
  background-color: var(--teal);
  position: absolute;
  bottom: -5px;
  left: 0;
  transform: ${({ isActive }) => (isActive ? "scaleX(1)" : "scaleX(0)")};
  transform-origin: center;
  transition: transform 0.3s ease;
`;
