export const useCustomer = () => {
  const customerName = useCookie("customerName", {
    default: () => "",
  });
  const hasNameError = computed(() => customerName.value.length < 2);
  const customerInitials = computed(() => {
    const names = customerName.value.split(" ");

    if (names.length < 2) {
      return customerName.value.substring(0, 2);
    }

    return `${names[0][0]}${names[1][0]}`;
  });

  return { customerName, hasNameError, customerInitials };
}