export function DeliveryComparisonTable() {
    return (
      <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Заголовок таблицы */}
        <div className="border-b border-gray-100 bg-gray-50/50 p-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Сравнение способов доставки
          </h2>
          <p className="mt-2 text-gray-600">
            Выберите оптимальный вариант для вашего груза, исходя из сроков, стоимости и типа товара.
          </p>
        </div>
  
        {/* Контейнер таблицы для горизонтального скролла на мобильных */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="text-left text-sm font-semibold text-gray-900">
                <th scope="col" className="px-8 py-4">Способ</th>
                <th scope="col" className="px-8 py-4">Средний срок</th>
                <th scope="col" className="px-8 py-4">Идеально подходит</th>
                <th scope="col" className="px-8 py-4">Ключевая характеристика</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Авиаперевозки */}
              <tr className="hover:bg-gray-50/70 transition-colors">
                <td className="px-8 py-5">
                  <div className="font-bold text-lg text-gray-900">✈️ Авиаперевозки</div>
                </td>
                <td className="px-8 py-5">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                    3–7 дней
                  </span>
                </td>
                <td className="px-8 py-5 text-gray-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Образцы продукции</li>
                    <li>Электроника</li>
                    <li>Медицинские товары</li>
                    <li>Документы</li>
                  </ul>
                </td>
                <td className="px-8 py-5">
                  <div className="font-medium text-gray-900">Самый быстрый способ</div>
                </td>
              </tr>
              {/* Железнодорожные перевозки */}
              <tr className="hover:bg-gray-50/70 transition-colors">
                <td className="px-8 py-5">
                  <div className="font-bold text-lg text-gray-900">🚆 Железнодорожные перевозки (FCL/LCL)</div>
                </td>
                <td className="px-8 py-5">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                    18–40 дней
                  </span>
                </td>
                <td className="px-8 py-5 text-gray-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Оборудование</li>
                    <li>Строительные материалы</li>
                    <li>Бытовая техника</li>
                  </ul>
                </td>
                <td className="px-8 py-5">
                  <div className="font-medium text-gray-900">Оптимальный баланс цены и скорости</div>
                </td>
              </tr>
              {/* Автомобильные перевозки */}
              <tr className="hover:bg-gray-50/70 transition-colors">
                <td className="px-8 py-5">
                  <div className="font-bold text-lg text-gray-900">🚚 Автомобильные перевозки</div>
                </td>
                <td className="px-8 py-5">
                  <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
                    14–25 дней
                  </span>
                  </td>
              <td className="px-8 py-5 text-gray-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>Регулярные поставки одежды</li>
                  <li>Запчасти</li>
                  <li>Товары народного потребления</li>
                </ul>
              </td>
              <td className="px-8 py-5">
                <div className="font-medium text-gray-900">Гибкий и универсальный вариант</div>
              </td>
            </tr>
            {/* Морские контейнерные перевозки */}
            <tr className="hover:bg-gray-50/70 transition-colors">
              <td className="px-8 py-5">
                <div className="font-bold text-lg text-gray-900">🚢 Морские контейнерные перевозки (FCL/LCL)</div>
              </td>
              <td className="px-8 py-5">
                <span className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-sm font-semibold text-purple-700">
                  30–60 дней
                </span>
              </td>
              <td className="px-8 py-5 text-gray-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>Строительные материалы</li>
                  <li>Мебель</li>
                  <li>Оборудование</li>
                </ul>
              </td>
              <td className="px-8 py-5">
                <div className="font-medium text-gray-900">Самый экономичный способ для больших объемов</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}